import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "@material-ui/core";

import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import HomePage from "./components/Home";
import ComposePage from "./components/Compose";
import AccountPage from "./components/Account";
import AdminPage from "./components/Admin";

import * as ROUTES from "./constants/routes";
import { withAuthentication } from "./components/Session";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Container align="center">
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.COMPOSE} component={ComposePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      </Container>
    </div>
  </Router>
);

export default withAuthentication(App);
