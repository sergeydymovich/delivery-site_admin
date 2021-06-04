import Navigation from "components/elements/Navigation/Navigation";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
      <Navigation /> 
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {children}
      </main>
    </>
  );
}

export default Layout;
