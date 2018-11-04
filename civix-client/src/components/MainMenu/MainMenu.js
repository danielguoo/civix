import React from "react";

//Some code for main dashboard

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//menu icons
import Icon from "@material-ui/core/Icon";
import EventIcon from "@material-ui/icons/Event";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ContactsIcon from "@material-ui/icons/Contacts";

const style =
{
  Grid: { marginBottom: 10 },
  Button: { width: "85%", padding:40, fontWeight: "bold", textTransform: "none", fontSize: 18, justifyContent: "space-between"},
  Icon: { transform: "scale(2)" }
}

export default props => (
  <fragment>

    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="primary">
          Community Calendar
          <EventIcon style={style.Icon}></EventIcon>
        </Button>
      </Grid>
    </Grid>
    
    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="secondary">
          My Calendar
          <EventAvailableIcon style={style.Icon}></EventAvailableIcon>
        </Button>
      </Grid>
    </Grid>

    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="primary">
          Ballot Board
          <ChatBubbleOutlineIcon style={style.Icon}></ChatBubbleOutlineIcon>
        </Button>
      </Grid>
    </Grid>

    <Grid container style={style.Grid}>
      <Grid item xs={12}>
        <Button variant="contained" style={style.Button} color="secondary">
           Representatives Hub
          <ContactsIcon style={style.Icon}></ContactsIcon>
        </Button>
      </Grid>
    </Grid>

  </fragment>
);
