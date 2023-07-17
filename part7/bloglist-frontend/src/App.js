import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import "./App.css";
import BlogList from "./components/BlogList";

const App = () => {
  return (
    <div>
      <Notification />
      <LoginForm />
      <BlogList />
    </div>
  );
};

export default App;
