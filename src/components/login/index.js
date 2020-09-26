import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import ErrorDialog from "../common/dialog";
import Storage from "../../utilities/localStorage";
import { useHistory } from "react-router-dom";
import Header from '../common/header';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Codigo Test
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnchange = (event) => {
    let name = event.target.name;

    if (name === "email") {
      setEmail(event.target.value);
      setEmailError(false);
      setEmailErrorMessage("");
    } else if (name === "password") {
      setPassword(event.target.value);
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  const PwdOnKeyPress = (event) => {
    if (event.key === "Enter") {
      OnSignIn();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const Validation = () => {
    let isValid = true;

    if (email === "" || email === undefined) {
      setEmailError(true);
      setEmailErrorMessage("This is required.");
      isValid = false;
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError(true);
      setEmailErrorMessage("Incorrect email format.");
      isValid = false;
    }

    if (password === "" || password === undefined) {
      setPasswordError(true);
      setPasswordErrorMessage("This is required.");
      isValid = false;
    }
    return isValid;
  };

  const OnSignIn = () => {
    if (Validation()) {
      let authInfo = {
        email: email,
        password: password,
      };

      axios.post("/api/auth", authInfo).then((res) => {
        if (res.data === "" || res.data === undefined || res.data === null) {
          setOpenDialog(true);
        } else {
          console.log("Response", res.data);
          Storage(localStorage).set('token', res.data.token);
          history.push('/backoffice');
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Header />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleOnchange}
            autoFocus            
            error={emailError}
            helperText={emailErrorMessage}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnchange}
            onKeyPress={PwdOnKeyPress}            
            error={passwordError}
            helperText={passwordErrorMessage}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={OnSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <ErrorDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          status="error"
          title="Error!"
          message="Email or Password is not correct."
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
