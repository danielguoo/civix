import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"

import DrawerMenu from "../DrawerMenu/DrawerMenu"

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
})

//To mark attendance, click; button will change to green
//To unmark attendance, click again; button will change back to red
class AttendingButton extends React.Component {
  constructor() {
    super()
    this.state = {
      marked: false
    }
  }
  changeColor() {
    this.setState({ marked: !this.state.marked })
  }
  render() {
    let bgColor = this.state.marked ? "green" : "red"
    return (
      <div>
        <Button
          variant="contained"
          style={{
            textTransform: "none",
            fontWeight: "bold",
            float: "right",
            backgroundColor: bgColor
          }}
          onClick={this.changeColor.bind(this)}
        >
          Attending
        </Button>
      </div>
    )
  }
}

//Clicking 'Learn More' button opens a dialog with a more complete description of the event
class EventDialog extends React.Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{
            textTransform: "none",
            fontWeight: "bold",
            float: "right",
            marginRight: 10
          }}
          onClick={this.handleClickOpen}
        >
          Learn More
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="event-title"
        >
          <DialogTitle id="event-title">{this.props.eventTitle}</DialogTitle>
          <DialogContentText
            id="event-date"
            style={{ textAlign: "center", fontSize: 14 }}
          >
            {this.props.eventDate}
          </DialogContentText>
          <DialogContentText
            id="event-time"
            style={{ textAlign: "center", fontSize: 14 }}
          >
            {this.props.eventTime}
          </DialogContentText>
          <DialogContentText
            id="event-location"
            style={{ textAlign: "center", fontSize: 14, marginBottom: 5 }}
          >
            {this.props.eventPlace}
          </DialogContentText>
          <Divider />
          <DialogContent>
            <DialogContentText id="event-description" style={{ fontSize: 12 }}>
              {this.props.fullDescription}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
const EventStyles = {
  eventcardtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left"
  },

  eventcarddate: {
    fontSize: 14,
    textAlign: "left"
  }
}

//Individual event
//Components: title, date, brief description
//'Learn More' button for fuller description
//'Attending' button for marking attendance
class Event extends React.Component {
  render() {
    return (
      <div>
        <ListItem>
          <ListItemText
            classes={{
              primary: EventStyles.eventcardtitle,
              secondary: EventStyles.eventcarddate
            }}
            primary={this.props.eventTitle}
            secondary={this.props.eventDate}
          />
          <Typography style={{ marginTop: 10, marginBottom: 10 }}>
            {this.props.briefDescription}
          </Typography>
          <AttendingButton />
          <EventDialog
            eventTitle={this.props.eventTitle}
            eventDate={this.props.eventDate}
            eventTime={this.props.eventTime}
            eventPlace={this.props.eventPlace}
            fullDescription={this.props.fullDescription}
          />
        </ListItem>
      </div>
    )
  }
}

//Scrollable list of events
class EventsList extends React.Component {
  render() {
    return (
      <div>
        <DrawerMenu />
        <List style={{ overflow: "auto" }}>
          <Event
            eventTitle="Westwood Forward Public Forum"
            eventDate="November 20, 2018"
            eventTime="5:00PM-8:00PM"
            eventPlace="10880 Wilshire Blvd #117, Los Angeles, CA 90024"
            briefDescription="The Westwood Village Improvement Association will be hosting a public forum to discuss the separation of UCLA from Westwood Village and North Village."
            fullDescription={
              <div>
                <p>
                  The Westwood Village Improvement Association (WVIA) Is A
                  Non-Profit Business Improvement District (BID) Organization.
                  Our mission it is to make Westwood Village a clean, safe and
                  friendly place for the community through maintenance, security
                  and enlivening programs. The WVIA shall lead the District by
                  taking positions on district-wide short and long term
                  opportunities, and considering matters such as city planning
                  and zoning, parking, events and other services that promote
                  increased tenant recruitment and retention, business, values
                  and investment.
                </p>{" "}
                <p>
                  Come join us on November 20th as we discuss ongoing attempts
                  to separate UCLA from Westwood Village and North Village. Hear
                  from students and residents about how this separation might
                  affect their personal and professional lives.
                </p>
              </div>
            }
          />
          <Event
            eventTitle="So The Midterms Are Over: Now What?"
            eventDate="November 15, 2018"
            eventTime="9:00AM-12:00PM"
            eventPlace="630 W. 5th Street, Los Angeles, CA 90071"
            briefDescription="Join friends and family at the Los Angeles Public Library to discuss midterm results and what they mean to you."
            fullDescription={
              <div>
                <p>
                  South Carolina hasn’t sent a newly elected Democrat to
                  Congress for 25 years. But on Tuesday, voters in the
                  Charleston area broke form and chose a Democrat over a
                  Republican endorsed by President Trump. That result might seem
                  like an outlier, given South Carolina’s strong Republican
                  tradition. But it is more evidence of a powerful new factor in
                  politics: the nation’s growing educational divide.
                </p>{" "}
                <p>
                  What trends and patterns emerged in the recent midterm
                  elections--and what might that mean for Los Angeles' future?
                  Come to the Los Angeles Public Library for a three-hour
                  discussion on one of the most significant events in recent
                  political history. <b>Refreshments will be provided!</b>
                </p>
              </div>
            }
          />
          <Event
            eventTitle="Moving Beyond #MeToo: The Impact on Women, Business, and Politics"
            eventDate="November 29, 2018"
            eventTime="8:00AM-6:00PM"
            eventPlace="11461 Sunset Boulevard, Los Angeles, CA 90049"
            briefDescription="Panels will discuss how business leaders and women can position for the post-MeToo era, as leaders in the corporate, social and political world."
            fullDescription={
              <div>
                <p>
                  Dedicated to building a network of elite professionals, the
                  Broads Circle is focused on taking women to the next and
                  highest level in business. The circle brings together women in
                  a variety of industries who share the same career and personal
                  drivers to generate revenue and assume leadership positions.
                </p>{" "}
                <p>
                  Attend panels by Broads Circle founder Darya Allen-Attar,
                  Fraser Communications CEO Renee Fraser, Ph.D., Pepper Hamilton
                  LLP partner Pamela S. Palmer, and many more.
                </p>
              </div>
            }
          />
        </List>
      </div>
    )
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventsList)
