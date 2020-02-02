import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { Button, Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles({
  root: {
    marginTop: 20
  }
});

const SignUpPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4">Sign Up</Typography>
      <SignUpForm />
    </Box>
  );
};

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email });
      })
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
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <Box>
          <TextField
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            label="Full Name"
          />
        </Box>

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
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            label="Password"
          />
        </Box>

        <Box>
          <TextField
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            label="Confirm Password"
          />
        </Box>

        <Button disabled={isInvalid} type="submit">
          {" "}
          Sign Up
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
