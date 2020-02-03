import React from "react";

import { Button } from "@material-ui/core";

import { withFirebase } from "../../logic/Firebase";

const SignOutButton = ({ firebase }) => (
  <Button onClick={firebase.doSignOut}>Sign Out</Button>
);

export default withFirebase(SignOutButton);
