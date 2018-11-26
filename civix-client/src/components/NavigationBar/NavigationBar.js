import React from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"

//Import navbar icons
import communitycalendaricon from "./communitycalendaricon.svg"
import personalcalendaricon from "./personalcalendaricon.svg"
import issuesicon from "./issuesicon.svg"
import contacticon from "./contacticon.svg"

import { Link } from "react-router-dom"

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <Navbar light expand="md" style={{ backgroundColor: "#d900ff" }}>
          <UncontrolledDropdown>
            <DropdownToggle
              nav
              caret
              style={{ color: "#ffffff", fontWeight: "bold" }}
            >
              Menu
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem>
                <Link to="/communitycalendar" style={{ color: "#000000" }}>
                  Community Calendar
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="icon" src={communitycalendaricon} />
                <Link to="/personalcalendar" style={{ color: "#000000" }}>
                  Personal Calendar
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="icon" src={communitycalendaricon} />
                <Link to="/issuesboard" style={{ color: "#000000" }}>
                  Ballot Board
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="icon" src={communitycalendaricon} />
                <Link to="/contact" style={{ color: "#000000" }}>
                  Representatives Hub
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                to="/account"
                style={{ color: "#ffffff", fontWeight: "bold" }}
              >
                Account
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar
