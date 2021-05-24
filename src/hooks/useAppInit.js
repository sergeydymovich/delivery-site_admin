import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const useAppInit = () => {
  const history = useHistory();
  const user = useSelector((s) => s.auth.token);

  useEffect(() => {
    if (user) {
      history.push("/orders");
    } else {
      history.push("/login");
    }
  }, [user, history]);
};
