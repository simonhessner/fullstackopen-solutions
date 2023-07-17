import { useNotification } from "../hooks/notification";

const Notification = () => {
  const {
    current: { type, message },
  } = useNotification();
  if (!type) return;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
