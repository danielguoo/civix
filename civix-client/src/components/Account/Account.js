import React from "react"
import { ListGroup, ListGroupItem, Button } from "reactstrap"

import NavigationBar from "../NavigationBar/NavigationBar"

class Account extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <ListGroup>
          <ListGroupItem>
            <div style={{ float: "left" }}>Username:</div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={{ float: "left" }}>Password:</div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={{ float: "left" }}>Email:</div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={{ float: "left" }}>Date of Birth:</div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={{ float: "left" }}>Political Affiliation:</div>
          </ListGroupItem>
        </ListGroup>
        <br />
        <Button color="primary">Edit Profile</Button>
      </div>
    )
  }
}

export default Account
