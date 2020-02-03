import React, { Component } from "react";
import moment from "moment";

import { List, ListItem, ListItemText } from "@material-ui/core";

import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

class EntriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      entries: []
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(({ uid }) => {
      this.setState({ loading: true });

      this.props.firebase.entries(uid).on("value", snapshot => {
        const entriesObject = snapshot.val();
        console.log("entriesObject :", entriesObject);

        const entriesList = Object.keys(entriesObject).map(key => ({
          ...entriesObject[key],
          uid: key
        }));
        this.setState({
          entries: entriesList,
          loading: false
        });
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.entries().off();
  }

  render() {
    const { entries, loading } = this.state;

    return (
      <div>
        <h1>Entries</h1>
        {loading && <div>Loading...</div>}
        <EntriesList entries={entries} />
      </div>
    );
  }
}

const EntriesList = ({ entries }) => (
  <List>
    {entries.map(entry => {
      const time = moment(entry.timestamp).format("Do MMM");
      const preview = entry.content.substr(0, 100) + "...";
      return (
        <ListItem button key={entry.uid}>
          <ListItemText
            primary={`${time} - ${entry.title}`}
            secondary={preview}
          />
        </ListItem>
      );
    })}
  </List>
);

EntriesPage.contextType = AuthUserContext;

export default withFirebase(EntriesPage);
