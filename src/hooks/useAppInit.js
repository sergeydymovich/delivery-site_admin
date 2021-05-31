import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const useAppInit = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [token]);
};
