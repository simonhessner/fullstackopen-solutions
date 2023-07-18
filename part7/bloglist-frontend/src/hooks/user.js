import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginService from "../services/login";
import { setUser, resetUser } from "../reducers/userSlice";

export const useUser = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, []);

  const login = async (credentials) => {
    const user = await loginService.login(credentials);
    dispatch(setUser(user));
    window.localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    dispatch(resetUser());
  };

  return {
    user,
    login,
    logout,
  };
};
