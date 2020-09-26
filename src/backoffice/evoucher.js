import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moment from "moment";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CssBaseline from "@material-ui/core/CssBaseline";
import CodigoAppBar from "./common/appbar";
import CodigoDrawer from "./common/drawer";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

class voucher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      expiryDate: moment(new Date()).format("yyyy-MM-DD"),
      amount: "",
      visa: true,
      master: false,
      payPal: false,
      americanExpress: false,
      visaDiscount: false,
      masterDiscount: false,
      americanDiscount: false,
      quantity: "",
      buyLimit: "",
      forme: true,
      forOthers: false,
      buyLimitForOthers: "",
      voucherImage: "",
      contentType: "",
      imgSrc: "https://via.placeholder.com/250",
      buyType: ["forme"],
      paymentMethods: ["visa"],
      paymentDiscount: [],
      errors: {
        title: false,
        description: false,
        amount: false,
        quantity: false,
        buyType: false,
        paymentMethods: false,
        expiryDate: false,
        buyLimit: false,
        buyLimitForOthers: false,
      },
      errorMessage: {
        title: "",
        description: "",
        amount: "",
        quantity: "",
        buyType: "",
        paymentMethods: "",
        expiryDate: "",
        buyLimit: "",
        buyLimitForOthers: "",
      },
      snackbarOpen: false,
      open: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlePaymentMethodsOnChange = this.handlePaymentMethodsOnChange.bind(
      this
    );
    this.handleBuyTypeOnChange = this.handleBuyTypeOnChange.bind(this);
    this.handleDiscountOnChange = this.handleDiscountOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleOnChange = (event) => {
    let name = event.target.name;
    if (event.target.type === "file") {
      let file = event.target.files;

      console.log("FIle", file[0]);
      if (file && file.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        // let imgBinary = fs.readFile(file[0]);
        this.setState({ voucherImage: file[0], contentType: file[0].type });
        reader.onloadend = (e) => {
          this.setState({ imgSrc: reader.result });
        };

        // console.log("Image URl", url);
      }
    } else if (event.target.type === "date") {
      this.setState({ expiryDate: event.target.value });
      this.mutateErrors("expiryDate", false, "");
    } else {
      if (name === "title") this.mutateErrors("title", false, "");
      if (name === "description") this.mutateErrors("description", false, "");
      if (name === "amount") this.mutateErrors("amount", false, "");
      if (name === "quantity") this.mutateErrors("quantity", false, "");

      this.setState({ [name]: event.target.value });
    }
  };

  handleBuyTypeOnChange(event) {
    if (event.target.type === "checkbox") {
      let targetId = event.target.id;
      const buyTypeArray = [];
      this.mutateErrors("buyType", false, "");
      if (targetId === "forme") {
        this.mutateErrors("buyLimit", false, "");
        this.setState({ buyLimit: "" });
      }
      if (targetId === "forOthers") {
        this.mutateErrors("buyLimitForOthers", false, "");
        this.setState({ buyLimitForOthers: "" });
      }

      this.setState({ [targetId]: event.target.checked });
      const checkedChk = document.getElementsByName("buyTypeChk");

      for (let i = 0; i < checkedChk; i++) {
        if (checkedChk[i].checked) {
          buyTypeArray.push(checkedChk[i].value);
        }
      }

      this.setState({ buyType: buyTypeArray });
    } else {
      let name = event.target.name;

      if (name === "buyLimit") this.mutateErrors("buyLimit", false, "");
      if (name === "buyLimitForOthers")
        this.mutateErrors("buyLimitForOthers", false, "");

      this.setState({ [name]: event.target.value });
    }
  }

  handlePaymentMethodsOnChange(event) {
    const targetId = event.target.id;
    const paymentArray = [];
    this.mutateErrors("paymentMethods", false, "");

    this.setState({ [targetId]: event.target.checked });

    const checkedChk = document.getElementsByName("paymentChk");

    for (let i = 0; i < checkedChk.length; i++) {
      if (checkedChk[i].checked) {
        paymentArray.push(checkedChk[i].value);
      }
    }

    this.setState({ paymentMethods: paymentArray });
  }

  handleDiscountOnChange(event) {
    const targetId = event.target.id;
    const discountArray = [];

    this.setState({ [targetId]: event.target.checked });

    const checkedChk = document.getElementsByName("discountChk");

    for (let i = 0; i < checkedChk.length; i++) {
      if (checkedChk[i].checked) {
        discountArray.push(checkedChk[i].value);
      }
    }

    this.setState({ paymentDiscount: discountArray });
  }

  handleDateChange = (date) => {
    this.setState({ selectDate: date });
  };

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

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  validation() {
    let isValid = true;

    if (this.state.title === "" || this.state.title === undefined) {
      this.mutateErrors("title", true, "This is required.");
      isValid = false;
    }

    if (this.state.description === "" || this.state.description === undefined) {
      this.mutateErrors("description", true, "This is required.");
      isValid = false;
    }

    if (this.state.amount === "" || this.state.amount === undefined) {
      this.mutateErrors("amount", true, "This is required.");
      isValid = false;
    }

    if (this.state.quantity === "" || this.state.quantity === undefined) {
      this.mutateErrors("quantity", true, "This is required.");
      isValid = false;
    }

    if (moment().diff(this.state.expiryDate) >= 0) {
      this.mutateErrors(
        "expiryDate",
        true,
        "Expiry Date must be greater than today."
      );
      isValid = false;
    }

    if (!this.state.forme && !this.state.forOthers) {
      this.mutateErrors("buyType", true, "Please select at least one.");
      isValid = false;
    }

    if (this.state.forme) {
      if (this.state.buyLimit === "" || this.state.buyLimit === undefined) {
        this.mutateErrors("buyLimit", true, "This is required.");
        isValid = false;
      }
    }

    if (this.state.forOthers) {
      if (
        this.state.buyLimitForOthers === "" ||
        this.state.buyLimitForOthers === undefined
      ) {
        this.mutateErrors("buyLimitForOthers", true, "This is required.");
        isValid = false;
      }
    }

    if (
      !this.state.visa &&
      !this.state.master &&
      !this.state.payPal &&
      !this.state.americanExpress
    ) {
      this.mutateErrors("paymentMethods", true, "Please select at least one.");
      isValid = false;
    }

    return isValid;
  }

  clearState() {
    this.setState({
      title: "",
      description: "",
      expiryDate: moment(new Date()).format("yyyy-MM-DD"),
      amount: "",
      visa: true,
      master: false,
      payPal: false,
      americanExpress: false,
      visaDiscount: false,
      masterDiscount: false,
      americanDiscount: false,
      quantity: "",
      buyLimit: "",
      forme: true,
      forOthers: false,
      buyLimitForOthers: "",
      voucherImage: "",
      contentType: "",
      imgSrc: "https://via.placeholder.com/250",
      buyType: ["forme"],
      paymentMethods: ["visa"],
      paymentDiscount: [],
    });
  }

  onSubmit() {
    if (this.validation()) {
      const fileData = new FormData();
      fileData.append("file", this.state.voucherImage);

      axios.post("/api/upload", fileData).then((res) => {
        console.log("File Upload", res);
        if (res.data) {
          let formData = {
            title: this.state.title,
            description: this.state.description,
            expiryDate: this.state.expiryDate,
            imageFileName: res.data.filename,
            contentType: this.state.contentType,
            amount: this.state.amount,
            paymentMethods: this.state.paymentMethods.toString(),
            paymentDiscount: this.state.paymentDiscount.toString(),
            quantity: this.state.quantity,
            buyType: this.state.buyType.toString(),
            buyLimit: this.state.buyLimit,
            buyLimitForOthers: this.state.buyLimitForOthers,
            isActive: false,
            createDate: Date.now(),
          };
          console.log("Form Data", formData);
          axios.post("/api/voucher/add", formData).then((res) => {
            // console.log("response", res);
            this.clearState();
            this.setState({ snackbarOpen: true });
          });
        }
      });
    }
  }

  render() {
    const {
      title,
      description,
      expiryDate,
      amount,
      visa,
      master,
      payPal,
      americanExpress,
      visaDiscount,
      masterDiscount,
      americanDiscount,
      quantity,
      buyLimit,
      forme,
      forOthers,
      buyLimitForOthers,
      errors,
      errorMessage,
      imgSrc,
      snackbarOpen,
      open,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <CodigoAppBar handleDrawerOpen={this.handleDrawerOpen} open={open} />
        <CodigoDrawer open={open} handleDrawerClose={this.handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <form noValidate autoComplete="off" encType="multipart/form-data">
              <Grid
                container
                spacing={2}
                direction="row"
                justify="space-around"
                alignItems="center"
                style={{ marginTop: "10px" }}
              >
                <Grid item xs={12} sm={12}>
                  <Typography variant="h5">eVoucher</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div>
                    <img src={imgSrc} width="250" height="250" alt="" />
                  </div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-file"
                    multiple
                    type="file"
                    name="picture"
                    onChange={this.handleOnChange}
                  />
                  <label htmlFor="image-file">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CloudUploadIcon />}
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      variant="outlined"
                      value={title}
                      required
                      inputProps={{ maxLength: 65 }}
                      error={errors.title}
                      helperText={errorMessage.title}
                      onChange={this.handleOnChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      variant="outlined"
                      value={description}
                      required
                      inputProps={{ maxLength: 200 }}
                      multiline
                      error={errors.description}
                      helperText={errorMessage.description}
                      onChange={this.handleOnChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="expiryDate"
                      name="expiryDate"
                      label="Expiry Date"
                      type="date"
                      variant="outlined"
                      defaultValue={expiryDate}
                      error={errors.expiryDate}
                      helperText={errorMessage.expiryDate}
                      onChange={this.handleOnChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="amount"
                      name="amount"
                      label="Amount"
                      type="number"
                      variant="outlined"
                      value={amount}
                      required
                      error={errors.amount}
                      helperText={errorMessage.amount}
                      onChange={this.handleOnChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="quantity"
                      name="quantity"
                      label="Quantity"
                      variant="outlined"
                      type="number"
                      value={quantity}
                      required
                      inputProps={{ maxLength: 8 }}
                      error={errors.quantity}
                      helperText={errorMessage.quantity}
                      onChange={this.handleOnChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormLabel component="h1">Buy Type</FormLabel>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth error={errors.buyType}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="forme"
                          checked={forme}
                          onChange={this.handleBuyTypeOnChange}
                          name="buyTypeChk"
                          value="forme"
                        />
                      }
                      label="For me"
                    />
                    <TextField
                      id="buyLimit"
                      name="buyLimit"
                      label="Buy Limit"
                      variant="outlined"
                      value={buyLimit}
                      required
                      inputProps={{ maxLength: 8 }}
                      disabled={forme ? false : true}
                      error={errors.buyLimit}
                      helperText={errorMessage.buyLimit}
                      onChange={this.handleBuyTypeOnChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth error={errors.buyType}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="forOthers"
                          checked={forOthers}
                          onChange={this.handleBuyTypeOnChange}
                          name="buyTypeChk"
                          value="forOthers"
                        />
                      }
                      label="For others"
                    />
                    <TextField
                      id="buyLimitForOthers"
                      name="buyLimitForOthers"
                      label="Buy limit for others"
                      variant="outlined"
                      value={buyLimitForOthers}
                      required
                      inputProps={{ maxLength: 8 }}
                      disabled={forOthers ? false : true}
                      error={errors.buyLimitForOthers}
                      helperText={errorMessage.buyLimitForOthers}
                      onChange={this.handleBuyTypeOnChange}
                    />
                  </FormControl>
                </Grid>
                <div style={{ width: "100%", marginLeft: "14px" }}>
                  <FormHelperText error={errors.buyType}>
                    {errorMessage.buyType}
                  </FormHelperText>
                </div>

                <Grid item xs={12} sm={12}>
                  <FormControl
                    style={{ margin: "3px", marginRight: "50px" }}
                    component="fieldset"
                  >
                    <FormLabel component="h1">Payment Methods</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="visa"
                            checked={visa}
                            onChange={this.handlePaymentMethodsOnChange}
                            name="paymentChk"
                            value="visa"
                          />
                        }
                        label="Visa Cards"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="master"
                            checked={master}
                            onChange={this.handlePaymentMethodsOnChange}
                            name="paymentChk"
                            value="master"
                          />
                        }
                        label="Master Cards"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="payPal"
                            checked={payPal}
                            onChange={this.handlePaymentMethodsOnChange}
                            name="paymentChk"
                            value="payPal"
                          />
                        }
                        label="PayPal"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="americanExpress"
                            checked={americanExpress}
                            onChange={this.handlePaymentMethodsOnChange}
                            name="paymentChk"
                            value="americanExpress"
                          />
                        }
                        label="American Express"
                      />
                    </FormGroup>
                    <FormHelperText error={errors.paymentMethods}>
                      {errorMessage.paymentMethods}
                    </FormHelperText>
                  </FormControl>
                  <FormControl style={{ margin: "3px" }} component="fieldset">
                    <FormLabel component="h1">Payment Discount</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="visaDiscount"
                            checked={visaDiscount}
                            onChange={this.handleDiscountOnChange}
                            name="discountChk"
                            disabled={visa ? false : true}
                            value="visa10"
                          />
                        }
                        label="Visa 10%"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="masterDiscount"
                            checked={masterDiscount}
                            onChange={this.handleDiscountOnChange}
                            name="discountChk"
                            disabled={master ? false : true}
                            value="master5"
                          />
                        }
                        label="Master 5%"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="americanDiscount"
                            checked={americanDiscount}
                            onChange={this.handleDiscountOnChange}
                            name="discountChk"
                            disabled={americanExpress ? false : true}
                            value="american10"
                          />
                        }
                        label="American Express 10%"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={this.handleCloseSnackbar}
              message="Successfully saved!"
              color="primary"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleCloseSnackbar}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            ></Snackbar>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(voucher);
