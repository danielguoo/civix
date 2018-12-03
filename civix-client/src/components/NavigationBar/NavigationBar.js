import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import civixtitle from "./civixtitle.png";
import { Link, Redirect } from "react-router-dom";
import "./NavigationBar.css";
import { IoIosCalendar, IoMdChatboxes } from "react-icons/io";
import { MdPeopleOutline } from "react-icons/md";

/**
 * Represents the application navigation bar. 
 * @param {Object} props - React props
 */
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this)
    this.state = {
      dropdownOpen: false,
      redirect: false
    };
  }
    /**
     * Toggles the dropdown menu from open to closed or closed to open.
     */
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

    /**
     * Logs out a logged-in user.
     */
  logout(){
    localStorage.setItem('user_key', null)
    localStorage.setItem('user_id', null)
    localStorage.setItem('user_name', null)
    this.setState({
     redirect: true,
    });
  }

    /**
     * Renders the navigation bar component. 
     * @return {ReactComponent} - NavigationBar component to display
     */
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to='/login'/>}
        <Navbar className="Navbar" light expand="md">
          <img className="CivixTitle" src={civixtitle} alt="Civix" />
          <Link className="NavButton" to="/calendar">
            <IoIosCalendar /> Calendar
          </Link>
          <Link className="NavButton" to="/issues">
            <IoMdChatboxes /> Ballot Board
          </Link>
          <Link className="NavButton" to="/contact">
            <MdPeopleOutline /> Representatives Hub
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <ButtonDropdown
              direction="left"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret size="sm" color="info" >{localStorage.getItem("user_name")}</DropdownToggle>
                <DropdownMenu className="dropdown">
                  <DropdownItem><Link
                to="/account"
                style={{ color: "#000000" }}
              >
              Account
              </Link></DropdownItem>
                  <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
