import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationSlice";

export const useNotification = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.notification);

  const notify = (type, message) => {
    dispatch(showNotification(type, message, 5000));
  };
  const info = (message) => notify("info", message);
  const error = (message) => notify("error", message);

  return { current, info, error };
};
