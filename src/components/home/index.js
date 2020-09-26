import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../common/header.js";
import Footer from "../common/footer.js";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import "../../assets/css/zoomIn.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 8),
    marginTop: theme.spacing(12),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroHeading: {
    fontSize: "4rem",
    lineHeight: "5rem",
    fontWeight: "600",
    textAlign: "left",
    color: "black",
  },
  heroSubHeading: {
    fontSize: "4.5rem",
    lineHeight: "5rem",
    fontWeight: "600",
    textAlign: "left",
    color: "#D5333E",
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
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  ellipsisText: {
    display: 'inline-block',
    width: '280px',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  }
}));

export default function Album() {
  const classes = useStyles();
  const history = useHistory();
  const [voucherList, setVoucherList] = useState([]);

  const fetchData = async () => {
    const result = await axios.get("/api/voucher/active/list");
    setVoucherList(result.data);
  };

  const itemOnClick = (id) => {
    console.log("ID", id);
    history.push('/product/detail/' + id);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              color="textSecondary"
              paragraph
              className={classes.heroHeading}
            >
              Here’s 5% of
              <br /> our published work.
            </Typography>
            <Typography
              variant="h1"
              color="textSecondary"
              paragraph
              className={classes.heroSubHeading}
            >
              See 100% of our power.
            </Typography>
            
          </Container>
        </div>

        {/* End hero unit */}
        <Grid container>
          {voucherList.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <div style={{ position: 'absolute', zIndex: '1001', color: 'white', fontSize: '20px', margin: '30px' }}>
                {item.title}
              </div>
              <div className={classes.ellipsisText} style={{ position: 'absolute', zIndex: '1001', color: 'white', fontSize: '40px', marginTop: '60px', marginLeft: '30px' }}>
                {item.description}
              </div>
              <Card className={classes.card}>
                <CardMedia
                  // className={classes.cardMedia}
                  className="hover-zoom"
                  image={"/uploads/" + item.img_file_name}                  
                  style={{ height: "450px" }}
                  onClick={() => itemOnClick(item._id)}
                />

                {/* <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
