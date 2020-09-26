import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ErrorDialog from "./components/common/dialog";

export default class UserSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPwd: "",
      secretCode: "",
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPwd: false,
        secretCode: false,
      },
      errorMessage: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPwd: "",
        secretCode: "",
      },
      openDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      dialogStatus: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOnChange(event) {
    let target = event.target.name;
    this.setState({ [target]: event.target.value });
    if(target === "firstName") this.mutateErrors("firstName", false, "");
    else if (target === "lastName") this.mutateErrors("lastName", false, "");
    else if (target === "email") this.mutateErrors("email", false, "");
    else if (target === "password") this.mutateErrors("password", false, "");
    else if (target === "confirmPwd")
      this.mutateErrors("confirmPwd", false, "");
    else if (target === "secretCode")
      this.mutateErrors("secretCode", false, "");
  }

  mutateErrors(target, err, msg) {
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [target]: err,
      },
      errorMessage: {
        ...prevState.errorMessage,
        [target]: msg,
      },
    }));
  }

  clearState() {
    this.setState({ firstName: "", lastName: "", email: "", password: "", confirmPwd: "", secretCode: "" });
  }

  handleOpenDialog(title, msg, status) {
    this.setState({
      openDialog: true,
      dialogTitle: title,
      dialogMessage: msg,
      dialogStatus: status,
    });
  }

  handleCloseDialog() {
    this.setState({ openDialog: false });
  }

  validation() {
    let isValid = true;

    if (this.state.firstName === "" || this.state.firstName === undefined){
      this.mutateErrors("firstName", true, "This is required.")
      isValid = false;
    } 

    if (this.state.lastName === "" || this.state.lastName === undefined){
      this.mutateErrors("lastName", true, "This is required.");
      isValid = false;
    }

    if (this.state.email === "" || this.state.email === undefined) {
      this.mutateErrors("email", true, "This is required.");
      isValid = false;
    } else if (
      !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      this.mutateErrors("email", true, "Incorrect email format.");
      isValid = false;
    }

    if (this.state.password === "" || this.state.password === undefined) {
      this.mutateErrors("password", true, "This is required.");
      isValid = false;
    }

    if (this.state.confirmPwd === "" || this.state.confirmPwd === undefined) {
      this.mutateErrors("confirmPwd", true, "This is required.");
      isValid = false;
    }

    if (this.state.password !== this.state.confirmPwd) {
      this.mutateErrors("confirmPwd", true, "Confirm password mismatch.");
      isValid = false;
    }

    if (this.state.secretCode === "" || this.state.secretCode === undefined) {
        this.mutateErrors("secretCode", true, "This is required.");
        isValid = false;
      } else if (
          /**
           * Secret COde ====================================================
           */
        this.state.secretCode !== 'A78U*#M1'
      ) {
        this.mutateErrors("secretCode", true, "Secret code not correct.");
        isValid = false;
      }

    return isValid;
  }

  onSubmit = async () => {
    if (this.validation()) {
                  
      let formData = {
        storeId: "HQ001",
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPwd,
        userType: "Admin",
        isActivated: true,
        createDate: Date.now(),
      };

      //   console.log("Form Data", formData);
      const chkEmail = await axios.post("/api/user/byemail", {
        email: this.state.email,
      });
      if (chkEmail.data) {
        this.handleOpenDialog("Error!", "Email already in use.", "error");
      } else {
        axios.post("/api/user/add", formData);
        this.clearState();
      }
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPwd,
      errors,
      errorMessage,
      openDialog,
      dialogTitle,
      dialogMessage,
      dialogStatus,
      secretCode,
    } = this.state;
    return (
      <div>
        <form noValidate autoComplete="off">
          <Container maxWidth="sm">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="space-around"
              alignItems="center"
              style={{ marginTop: "10vh" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5" align="center">
                  Setup User Account
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={this.handleOnChange}
                    required
                    error={errors.firstName}
                    helperText={errorMessage.firstName}
                    inputProps={{ maxLength: 45 }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={this.handleOnChange}
                    required
                    error={errors.lastName}
                    helperText={errorMessage.lastName}
                    inputProps={{ maxLength: 45 }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={this.handleOnChange}
                    required
                    error={errors.email}
                    helperText={errorMessage.email}
                    inputProps={{ maxLength: 45 }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={this.handleOnChange}
                    required
                    error={errors.password}
                    helperText={errorMessage.password}
                    inputProps={{ maxLength: 15 }}
                    autoComplete="password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id="confirmPwd"
                    name="confirmPwd"
                    label="ConfirmPwd Password"
                    variant="outlined"
                    type="password"
                    value={confirmPwd}
                    onChange={this.handleOnChange}
                    required
                    error={errors.confirmPwd}
                    helperText={errorMessage.confirmPwd}
                    inputProps={{ maxLength: 15 }}
                    autoComplete="ConfirmPassword"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id="secretCode"
                    name="secretCode"
                    label="Secret Code"
                    variant="outlined"
                    type="password"
                    value={secretCode}
                    onChange={this.handleOnChange}
                    required
                    error={errors.secretCode}
                    helperText={errorMessage.secretCode}
                    inputProps={{ maxLength: 10 }}
                    autoComplete="ConfirmPassword"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ textTransform: "none" }}
                  onClick={this.onSubmit}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
        <ErrorDialog
          open={openDialog}
          handleClose={this.handleCloseDialog}
          title={dialogTitle}
          message={dialogMessage}
          status={dialogStatus}
        />
      </div>
    );
  }
}
