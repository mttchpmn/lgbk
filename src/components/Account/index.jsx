import React from "react";

import { Button, Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthUserContext, withAuthorisation } from "../Session";
import PasswordChangeForm from "../PasswordChange";

const useStyles = makeStyles({
  root: {
    marginTop: 20
  }
});

const AccountPage = () => {
  const classes = useStyles();

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Box className={classes.root}>
          <Typography variant="h4">Account</Typography>
          <Typography>Email: {authUser.email}</Typography>
          <PasswordChangeForm />
        </Box>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withAuthorisation(condition)(AccountPage);
