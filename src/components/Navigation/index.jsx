import React from "react";
import { withRouter } from "react-router-dom";

import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import LibraryIcon from "@material-ui/icons/LibraryBooks";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

import SignOutButton from "../auth/SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../logic/Session";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: 250
  }
}));

const Navigation = () => {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavAuth open={navOpen} setOpen={setNavOpen} />
          ) : (
            <Header />
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
};

const Header = ({ setOpen }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              ) : null
            }
          </AuthUserContext.Consumer>
          <Typography variant="h6" className={classes.title}>
            lgbk
          </Typography>
          <AuthUserContext.Consumer>
            {authUser => (authUser ? <SignOutButton /> : <SignInButton />)}
          </AuthUserContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const SignInButton = withRouter(({ history }) => (
  <Button onClick={() => history.push(ROUTES.SIGN_IN)}>Sign In</Button>
));

const NavAuth = withRouter(({ open, setOpen, history }) => {
  const classes = useStyles();

  return (
    <div>
      <Header setOpen={setOpen} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className={classes.drawer}>
          <List>
            <ListItem
              button
              onClick={() => {
                history.push(ROUTES.HOME);
                setOpen(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push(ROUTES.COMPOSE);
                setOpen(false);
              }}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Compose" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push(ROUTES.ENTRIES);
                setOpen(false);
              }}
            >
              <ListItemIcon>
                <LibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Entries" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                history.push(ROUTES.ACCOUNT);
                setOpen(false);
              }}
            >
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
});

export default Navigation;
