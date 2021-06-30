import React, { useState } from "react";
import UserProfile from "components/elements/UserProfile/UserProfile";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import HeightIcon from '@material-ui/icons/Height';
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import CategoryIcon from "@material-ui/icons/Category";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import SettingsIcon from '@material-ui/icons/Settings';
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Collapse,
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
  header: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  listItem: {
    textTransform: "uppercase",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Navigation() {
  const [activeCategory, setActiveCategory] = useState("");
  const classes = useStyles();

  const toggleShowNestedList = (category) => {
    setActiveCategory((prev) => (prev === category ? "" : category));
  };
  return (
    <>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <UserProfile />
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
        <Box className={classes.toolbar}>
          <Box className={classes.logoWrapper}>
            <Avatar src={logo} variant="square" />
            <Typography variant="h5" component="p" noWrap>
              СТОЛЛЕ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <List>
          <Link to="/orders">
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <NotificationsActiveIcon />
              </ListItemIcon>
              <ListItemText primary="заказы" />
            </ListItem>
          </Link>

          <Link to="/products">
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText primary="продукты" />
            </ListItem>
          </Link>

          <ListItem
            className={classes.listItem}
            onClick={() => toggleShowNestedList("ингредиенты")}
            button
          >
            <ListItemIcon>
              <ViewComfyIcon />
            </ListItemIcon>
            <ListItemText primary="ингредиенты" />
          </ListItem>

          <Collapse
            in={activeCategory === "ингредиенты"}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <Link to="/ingredients">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BorderAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="основные" />
                </ListItem>
              </Link>

              <Link to="/extra-ingredients">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ScatterPlotIcon />
                  </ListItemIcon>
                  <ListItemText primary="дополнительные" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <Link to="/categories">
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="категории" />
            </ListItem>
          </Link>

          <Link to="/pizza-sizes">
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <HeightIcon />
              </ListItemIcon>
              <ListItemText primary="размеры пиццы" />
            </ListItem>
          </Link>

          <Link to="/fields">
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="поля продуктов" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
