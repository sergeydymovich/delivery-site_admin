import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { loggedInUser } from "reducers/authSlice";
import { fetchLoggedInUser } from "api/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  copyright: {
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
}));

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const styles = useStyles();
  const dispatch = useDispatch();

  const loggedIn = (e) => {
    e.preventDefault();

    fetchLoggedInUser(phone, password)
      .then((res) => {
        const { user, token } = res.data;
        dispatch(loggedInUser({ ...user, token }));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const handlePhone = (e) => {
    setError(false);
    setPhone(e.target.value);
  };

  const handlePassword = (e) => {
    setError(false);
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <form onSubmit={loggedIn} className={styles.form} noValidate>
          <TextField
            error={error}
            helperText={error && "Неверный телефон или пароль"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Телефон"
            name="phone"
            autoFocus
            value={phone}
            onChange={handlePhone}
          />
          <TextField
            error={error}
            helperText={error && "Неверный телефон или пароль"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Войти
          </Button>
        </form>
      </div>
      <Typography component="p" className={styles.copyright}>
        {"Copyright © СТОЛЛЕ 2021 "}
      </Typography>
    </Container>
  );
}
