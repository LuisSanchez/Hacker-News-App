import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

class Hit extends Component {
  dateStyle = {
    flex: "none",
    paddingRight: 10,
    color: "#333",
  };

  authorStyle = {
    color: "#999",
  };

  titleStyle = {
    flex: "none",
    color: "#333",
  };

  listStyle = {
    borderBottom: "1px solid #ddd",
    paddingTop: 8,
    paddingBottom: 8,
  };

  /**
   * Returns the date formatted as requested.
   * @param {Date} date
   */
  getFormattedDate(date) {
    // UTC dates are giving wrong values, but this still works
    const hitDate = moment(date);
    const formattedHitDate = moment(hitDate.format("DD-MM-YYYY"), "DD-MM-YYYY");
    const formattedToday = moment(new Date(), "DD-MM-YYYY");
    const isToday = formattedHitDate.diff(formattedToday, "days");
    switch (isToday) {
      case 0:
        return hitDate.format("hh:mm A").toString();
      case -1:
        return "Yesterday";
      default:
        return hitDate.format("MMM DD");
    }
  }

  render() {
    return (
      <ListItem
        style={this.listStyle}
        key={this.props.hit._id}
        dense
        button
        onClick={() => this.props.onRowClick(this.props.hit)}
      >
        <ListItemText
          style={this.titleStyle}
          primary={`${this.props.hit.story_title || this.props.hit.title} `}
        />
        <ListItemText
          style={this.authorStyle}
          primary={` - ${this.props.hit.author} - `}
        />
        <ListItemText
          style={this.dateStyle}
          primary={`${this.getFormattedDate(this.props.hit.created_at)}`}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="comments"
            title="Delete"
            onClick={() => this.props.onDelete(this.props.hit)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Hit;
