import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { Button, Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../../logic/Firebase";
import * as ROUTES from "../../../constants/routes";

const useStyles = makeStyles({
  root: {
    marginTop: 20
  }
});

const SignInPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4">Sign In</Typography>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Box>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <Box>
          <TextField
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            label="Email Address"
          />
        </Box>
        <Box>
          <TextField
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            label="Password"
          />
        </Box>
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
