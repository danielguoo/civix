import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

//menu icons
import EventIcon from "@material-ui/icons/Event"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import ContactsIcon from "@material-ui/icons/Contacts"
import { Link } from "react-router-dom"
import MenuItem from "@material-ui/core/MenuItem"

import Calendar from "../Calendar/Calendar"

const styles = {
  list: {
    width: "20%"
  }
}

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { classes } = this.props

    const iconList = [
      <EventIcon />,
      <EventAvailableIcon />,
      <ChatBubbleOutlineIcon />,
      <ContactsIcon />
    ]

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {[
            "Community Calendar",
            "My Calendar",
            "Ballot Board",
            "Representatives Hub"
          ].map((text, index) => (
            <ListItem button key={text} component={Link} to="/Calendar">
              <ListItemIcon>{iconList[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.toggleDrawer("left", true)}
        >
          Menu
        </Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <MenuItem component={Link} to="/Calendar">
            Doodah Day
          </MenuItem>
          <div tabIndex={0} role="button" component={Link} to="/Calendar">
            {fullList}
          </div>
        </Drawer>
      </div>
    )
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TemporaryDrawer)
