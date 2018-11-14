import React from "react"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import EditIcon from "@material-ui/icons/Edit"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"

const Account = () => (
  <div>
    <List>
      <ListItem style={{ justifyContent: "space-between" }}>
        <Typography>
          Username: <b>Joe Schmoe</b>
        </Typography>
        <IconButton style={{ color: "primary" }}>
          <EditIcon color="primary" />
        </IconButton>
      </ListItem>
      <Divider />
      <ListItem style={{ justifyContent: "space-between" }}>
        <Typography>
          Email: <b>jschmoe123@gmail.com</b>
        </Typography>
        <IconButton style={{ color: "primary" }}>
          <EditIcon color="primary" />
        </IconButton>
      </ListItem>
      <Divider />
      <ListItem style={{ justifyContent: "space-between" }}>
        <Typography>
          Date of Birth: <b>4-28-97</b>
        </Typography>
        <IconButton style={{ color: "primary" }}>
          <EditIcon color="primary" />
        </IconButton>
      </ListItem>
      <Divider />
      <ListItem style={{ justifyContent: "space-between" }}>
        <Typography>
          Address: <b>12345 Chardonnay Ave.</b>
        </Typography>
        <IconButton style={{ color: "primary" }}>
          <EditIcon color="primary" />
        </IconButton>
      </ListItem>
      <Divider />
      <ListItem style={{ justifyContent: "space-between" }}>
        <Typography>
          Political Affiliation: <b>Independent</b>
        </Typography>
        <IconButton style={{ color: "primary" }}>
          <EditIcon color="primary" />
        </IconButton>
      </ListItem>
    </List>
  </div>
)

export default Account
