import { useSelector } from "react-redux";

const Notification = () => {
  const { type, message } = useSelector((state) => state.notification);
  if (!type) return;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
