import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

//menu icons
import EventIcon from "@material-ui/icons/Event"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import ContactsIcon from "@material-ui/icons/Contacts"

import { Link } from "react-router-dom"
import IconButton from "@material-ui/core/IconButton"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import MenuIcon from "@material-ui/icons/Menu"

const styles = {
  list: {
    width: "20%"
  }
}

class PopupMenu extends React.Component {
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
      <ContactsIcon />,
      <MenuIcon />
    ]

    const linkList = [
      "/Calendar",
      "/Calendar",
      "/Issues",
      "/Contact",
      "/MainMenu"
    ]

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {[
            "Community Calendar",
            "My Calendar",
            "Ballot Board",
            "Representatives Hub",
            "Main Menu"
          ].map((text, index) => (
            <ListItem button key={text} component={Link} to={linkList[index]}>
              <ListItemIcon>{iconList[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer("left", true)}
          style={{ float: "left" }}
        >
          <PlayArrowIcon
            color="secondary"
            style={{ transform: "scale(1.5)" }}
          />
        </IconButton>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div tabIndex={0} role="button">
            {fullList}
          </div>
        </Drawer>
      </div>
    )
  }
}

PopupMenu.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PopupMenu)
