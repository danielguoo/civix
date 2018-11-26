import React from "react"
import Drawer from "material-ui/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

//menu icons
import EventIcon from "@material-ui/icons/Event"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import ContactsIcon from "@material-ui/icons/Contacts"
import MenuIcon from "@material-ui/icons/Menu"

class AppBarDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const iconList = [
      <EventIcon />,
      <EventAvailableIcon />,
      <ChatBubbleOutlineIcon />,
      <ContactsIcon />,
      <MenuIcon />
    ]

    return (
      <div>
        <Drawer open={this.props.open}>
          <List>
            {[
              "Community Calendar",
              "My Calendar",
              "Ballot Board",
              "Representatives Hub",
              "Main Menu"
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{iconList[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}
export default AppBarDrawer
