import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../../constants/routes";

const withAuthorisation = condition => Component => {
  class WithAuthorisation extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.props.firebase
            .user(authUser.uid)
            .once("value")
            .then(snapshot => {
              const dbUser = snapshot.val();
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser
              };
              if (!condition(authUser)) {
                this.props.history.push(ROUTES.SIGN_IN);
              }
            });
        } else {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorisation);
};

export default withAuthorisation;
