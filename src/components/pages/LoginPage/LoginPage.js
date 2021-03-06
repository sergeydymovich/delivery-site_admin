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
import { login } from "reducers/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

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
  const [phone, setPhone] = useState("375447453285");
  const [password, setPassword] = useState("berezovka1994");
  const [error, setError] = useState("");
  const styles = useStyles();
  const dispatch = useDispatch();

  const loggedIn = async (e) => {
    e.preventDefault();

    try {
      unwrapResult(
        await dispatch(
          login({
            phone,
            password,
          })
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
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
            helperText={!!error && error}
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
            helperText={!!error && error}
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
