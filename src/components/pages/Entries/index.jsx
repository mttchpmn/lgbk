import React, { Component } from "react";
import moment from "moment";

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { withFirebase } from "../../logic/Firebase";
import { AuthUserContext } from "../../logic/Session";

class EntriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      entries: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(({ uid }) => {
      this.setState({ loading: true, uid });

      this.props.firebase.entries(uid).on("value", snapshot => {
        const entriesObject = snapshot.val();
        if (entriesObject) {
          const entriesList = Object.keys(entriesObject).map(key => ({
            ...entriesObject[key],
            uid: key
          }));
          this.setState({
            entries: entriesList,
            loading: false
          });
        }
        this.setState({
          entriesList: null,
          loading: false
        });
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.entries().off();
  }

  render() {
    const { entries, loading, uid } = this.state;

    return (
      <div>
        <h1>Entries</h1>
        {loading && <div>Loading...</div>}
        <EntriesList
          entries={entries}
          uid={uid}
          firebase={this.props.firebase}
        />
      </div>
    );
  }
}

const EntriesList = ({ entries, uid, firebase }) => {
  if (!entries) return <Typography>No entries yet</Typography>;
  return (
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
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => firebase.entry(uid, entry.uid).remove()}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

EntriesPage.contextType = AuthUserContext;

export default withFirebase(EntriesPage);
