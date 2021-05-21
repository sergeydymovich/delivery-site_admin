import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import CategoryIcon from "@material-ui/icons/Category";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from "@material-ui/core";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    height: "50px",
  },
}));

function Navigation() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <div className={classes.logoWrapper}>
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography variant="h4" component="p" noWrap>
              СТОЛЛЕ
            </Typography>
          </div>
        </div>
        <Divider />
        <List className={classes.list}>
          <Link to="/orders">
            <ListItem button>
              <ListItemIcon>
                <NotificationsActiveIcon />
              </ListItemIcon>
              <ListItemText primary="заказы" />
            </ListItem>
          </Link>

          <Link to="/products">
            <ListItem button>
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText primary="продукты" />
            </ListItem>
          </Link>

          <ListItem button>
            <ListItemIcon>
              <ViewComfyIcon />
            </ListItemIcon>
            <ListItemText primary="ингредиенты" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="категории" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="пользователи" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
