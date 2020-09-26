import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";

import Header from "../common/header";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    borderRadius: "0px",
  },
  cardMedia: {
    // paddingTop: "56.25%", // 16:9
    transformOrigin: '50% 55%',
  },
}));

export default function Detail(props) {
  const classes = useStyles();
  const [voucher, setVoucher] = useState([]);

  const fetchData = async () => {
    const result = await axios.post("/api/voucher/detail", {
      voucherId: props.match.params.id,
    });
    setVoucher(result.data);
  };

//   const buyTypeTransform = (data) => {
//      console.log("Data", data)
//     let res = data.toString().split(",");
//     let transform = res
//       .toString()
//       .replace("forme", "Buy for me")
//       .replace("buyForOthers", "Gift to another")
      
//     let result = transform;
//     return result;
//   }; 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Header />
        <div className={classes.paper}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography component="h1" style={{ fontSize: "60px" }}>
                {voucher.title}
              </Typography>
              <Typography component="h1" style={{ fontSize: "30px" }}>
                {voucher.description}
              </Typography>
              <Divider style={{ width: "80%", marginTop: "20px" }} />
              <div style={{ marginTop: "20px" }}>
                <strong>Amount:</strong> {voucher.amount}$
              </div>
              <div>
                <strong>Quantity:</strong> {voucher.quantity}
              </div>                            
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Check out
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} alignItems="right">
              {/* <img src={require("../../uploads/" + voucher.img_file_name)}  /> */}

              <Card className={classes.card}>
                <CardMedia                              
                  image={`/uploads/${voucher.img_file_name}`}
                  title="Image title"
                  style={{ height: "100%", width: "500px" }}
                />
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
}
