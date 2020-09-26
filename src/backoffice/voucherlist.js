import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import moment from "moment";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  ellipsisText: {
    display: 'inline-block',
    width: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  }
}));

export default function Vouchers() {
  const classes = useStyles();
  const [voucherList, setVoucherList] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [activateMessage, setActivateMessage] = React.useState("");

  const fetchData = async () => {
    const response = await axios.get("/api/voucher/list");
    setVoucherList(response.data);
  };

  useEffect(() => {   

    fetchData();
  }, []);

  const handleChangeSwitch = (event) => {
    let params = {
      voucherId: event.target.id,
      isActive: event.target.checked,
    }

    if (event.target.checked){
      setActivateMessage("Voucher Activated.");
    } else  setActivateMessage("Voucher Inactivated.");

    axios.put('/api/voucher/activate', params).then(res => {     
      setOpenSnackbar(true); 
      fetchData();
    })
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const discountTransform = (data) => {
    let res = data.toString().split(",");
    let visa = res
      .toString()
      .replace("visa10", "Visa 10%")
      .replace("master5", "Master 5%")
      .replace("american10", "American Express 10%");

    let result = visa;
    return result;
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Voucher List
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Buy Limit</TableCell>
                <TableCell>Is Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voucherList.length > 0 ? (
                voucherList.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {moment(item.create_date).format("DD-MMM-yyyy")}
                    </TableCell>
                    <TableCell className={classes.ellipsisText}>{item.description}</TableCell>
                    <TableCell>
                      {item.payment_method.toString().toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {discountTransform(item.payment_discount)}
                    </TableCell>
                    <TableCell>
                      {moment(item.expiry_date).format("DD-MMM-yyyy")}
                    </TableCell>
                    <TableCell align="right">{item.amount}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.buy_limit}</TableCell>
                    <TableCell>
                      <Switch
                        id={item._id}                        
                        onChange={handleChangeSwitch}
                        checked={item.is_active}
                        color="primary"
                        name="swtActive"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan="10"
                    style={{
                      textAlign: "center",
                      fontSize: "30px",
                      height: "200px",
                    }}
                  >
                    No Data{" "}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            {/* <Link color="primary" href="#" onClick={preventDefault}>
              See more orders
            </Link> */}
          </div>
        </Paper>
      </Grid>
      <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              message={activateMessage}
              color="primary"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            ></Snackbar>
    </React.Fragment>
  );}
