import React from "react"
import { Link } from "react-router-dom"

//Some code for main dashboard

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

//menu icons
import EventIcon from "@material-ui/icons/Event"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import ContactsIcon from "@material-ui/icons/Contacts"

const style = {
  Grid: { marginBottom: 10, marginTop: 30 },
  Button: {
    width: "85%",
    padding: 40,
    fontWeight: "bold",
    textTransform: "none",
    fontSize: 18,
    justifyContent: "space-between"
  },
  Icon: { transform: "scale(2)" }
}

export default props => (
  <fragment>
    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="primary">
          Community Calendar
          <EventIcon style={style.Icon} />
        </Button>
      </Grid>
    </Grid>

    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="secondary">
          My Calendar
          <EventAvailableIcon style={style.Icon} />
        </Button>
      </Grid>
    </Grid>

    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="primary">
          Ballot Board
          <ChatBubbleOutlineIcon style={style.Icon} />
        </Button>
      </Grid>
    </Grid>

    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="secondary">
          Representatives Hub
          <ContactsIcon style={style.Icon} />
        </Button>
      </Grid>
    </Grid>
  </fragment>
)
