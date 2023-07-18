const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const commentsRouter = require("./controllers/comments");
const logger = require("./utils/logger");
const {
  unknownEndpoint,
  invalidId,
  validationErrorHandler,
  tokenError,
  tokenExtractor,
  userExtractor,
} = require("./utils/middleware");
const morgan = require("morgan");

mongoose.set("strictQuery", false);

logger.info("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(tokenExtractor);

app.use("/api/blogs", userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs/:blog_id/comments", commentsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use("/api/blogs", invalidId);
app.use(validationErrorHandler);
app.use(tokenError);
app.use(unknownEndpoint);

module.exports = app;
