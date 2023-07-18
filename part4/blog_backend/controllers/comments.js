const commentsRouter = require("express").Router({
  mergeParams: true,
});
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.get("/", async (request, response) => {
  const blogId = request.params.blog_id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }
    const blogWithComments = await blog.populate("comments");
    response.status(200).json(blogWithComments.comments);
  } catch (exception) {
    return response.status(500).send({
      error: exception.message,
    });
  }
});

commentsRouter.post("/", async (request, response) => {
  const body = request.body;
  const blogId = request.params.blog_id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }

    // add blog to the comment
    const comment = new Comment(body);
    comment.blog = blog.id;
    const savedComment = await comment.save();

    // Add blog to the user
    blog.comments = blog.comments.concat(comment._id);
    blog.save();

    const commentWithBlog = await savedComment.populate("blog");

    response.status(201).json(commentWithBlog);
  } catch (exception) {
    return response.status(500).send({
      error: exception.message,
    });
  }
});

module.exports = commentsRouter;
