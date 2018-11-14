import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"

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
          color="secondary"
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
          <Grid container spacing={12}>
            <Grid item xs={12}>
              <ListItemText
                classes={{
                  primary: EventStyles.eventcardtitle,
                  secondary: EventStyles.eventcarddate
                }}
                primary={this.props.eventTitle}
                secondary={this.props.eventDate}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ marginTop: 10, marginBottom: 15 }}>
                {this.props.briefDescription}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AttendingButton />
              <EventDialog
                eventTitle={this.props.eventTitle}
                eventDate={this.props.eventDate}
                eventTime={this.props.eventTime}
                eventPlace={this.props.eventPlace}
                fullDescription={this.props.fullDescription}
              />
            </Grid>
          </Grid>
        </ListItem>
      </div>
    )
  }
}

//Scrollable list of events
class EventsList extends React.Component {
  render() {
    return (
      <List>
        <Event
          eventTitle="Westwood Forward Public Forum"
          eventDate="November 9, 2018"
          eventTime="5:00PM-8:00PM"
          eventPlace="10880 Wilshire Blvd #117, Los Angeles, CA 90024"
          briefDescription="The Westwood Village Improvement Association will be hosting a public forum to discuss the separation of UCLA from Westwood Village and North Village."
          fullDescription={
            <div>
              <p>
                The Westwood Village Improvement Association (WVIA) Is A
                Non-Profit Business Improvement District (BID) Organization. Our
                mission it is to make Westwood Village a clean, safe and
                friendly place for the community through maintenance, security
                and enlivening programs. The WVIA shall lead the District by
                taking positions on district-wide short and long term
                opportunities, and considering matters such as city planning and
                zoning, parking, events and other services that promote
                increased tenant recruitment and retention, business, values and
                investment.
              </p>{" "}
              <p>
                Come join us on November 20th as we discuss ongoing attempts to
                separate UCLA from Westwood Village and North Village. Hear from
                students and residents about how this separation might affect
                their personal and professional lives.
              </p>
            </div>
          }
        />
      </List>
    )
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventsList)
