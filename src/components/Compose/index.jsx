import React, { Component } from "react";
import { compose } from "recompose";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import { withAuthorisation } from "../Session";

const ComposePage = () => (
  <div>
    <h1>Compose New Entry</h1>
    <Editor />
  </div>
);

const INITIAL_STATE = {
  uid: "",
  createdAt: null,
  title: "",
  content: "",
  error: null
};

class EditorBase extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = ({ uid }) => {
    const { title, content } = this.state;
    const timestamp = this.props.firebase.timestamp;
    this.props.firebase.entries(uid).push({ title, content, uid, timestamp });
    this.setState(INITIAL_STATE);
  };

  render() {
    const { title, content, error } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div>
              <input name="title" value={title} onChange={this.onChange} />
            </div>
            <div>
              <textarea
                name="content"
                value={content}
                onChange={this.onChange}
              />
            </div>
            <button onClick={() => this.onSubmit(authUser)}>Save</button>
            {error && <p>{error.message}</p>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const Editor = withFirebase(EditorBase);

const condition = authUser => !!authUser;

export default compose(withAuthorisation(condition))(ComposePage);
