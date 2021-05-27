import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const useAppInit = () => {
  const history = useHistory();
  const token = useSelector((s) => s.auth.token);

  useEffect(() => {
    if (token) {
      history.push("/orders");
    } else {
      history.push("/login");
    }
  }, [token, history]);
};
