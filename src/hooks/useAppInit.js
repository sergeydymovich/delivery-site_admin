import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loggedInUser } from "reducers/authSlice";

export const useAppInit = () => {
  const history = useHistory();
  const token = useSelector((s) => s.auth.token);
  const storageUser = JSON.parse(localStorage.getItem("user")) || null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (storageUser || token) {
      history.push("/orders");
      if (!token) {
        dispatch(loggedInUser(storageUser));
      }
    } else {
      history.push("/login");
    }
  }, [token, history, storageUser, dispatch]);
};
