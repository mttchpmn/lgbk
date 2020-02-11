import React, { Component } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { withAuthorisation, AuthUserContext } from "../../logic/Session";

const HomePage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Home</h1>
          <p>Welcome home, {authUser.username.split(" ")[0]}.</p>
          <p>Time to start writing. No time like the present.</p>
        </div>
      )}
    </AuthUserContext.Consumer>
  </div>
);

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = editorState => {
      this.setState({ editorState });
      console.log("editorState :", editorState);
    };
    window.state = this.state.editorState.getCurrentContent();
  }

  render() {
    return (
      <div style={{ border: "2px solid #505050" }}>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorisation(condition)(HomePage);
