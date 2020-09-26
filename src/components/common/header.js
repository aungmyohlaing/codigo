import React from "react";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  hamburgerButton: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
      marginRight: theme.spacing(2),
    },
  },
  appBarLinkButton: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      textTransform: "none",
    },
  },
  appBarBoxShadow: {
    boxShadow: "none",
    color: theme.palette.background.paper,
  },
  drawerHeader: {
    padding: "20px",
    textAlign: "center",
    fontSize: "1.25rem",
    fontWeight: "500",
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const drawerPos = "top";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    right: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        anchor={drawerPos}
        open={state[drawerPos]}
        onClose={toggleDrawer(drawerPos, false)}
      >
        <div className={classes.drawerHeader}>Codigo Test</div>
        <Divider />
        <div style={{ padding: "15px" }}>
          <Button
            component={Link}
            to={"/login"}
            color="inherit"
            
          >
            LogIn
          </Button>
        </div>
      </Drawer>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.hamburgerButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(drawerPos, true)}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              textTransform: "none",
              color: "inherit",
            }}
          >
            <Typography variant="h6" style={{ marginRight: "30px" }}>
              Codigo Coding Test
            </Typography>
          </Link>

          <div className={classes.grow}></div>
          <Button
            component={Link}
            to={"/login"}
            color="inherit"
            className={classes.appBarLinkButton}
          >
            LogIn
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
