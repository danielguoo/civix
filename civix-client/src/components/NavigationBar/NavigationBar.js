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

//TODO: Add icons

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
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  logout(){
    console.log("HIIIII")
    localStorage.setItem('user_key', null)
    localStorage.setItem('user_id', null)
    localStorage.setItem('user_name', null)
    this.setState({
     redirect: true,
    });
  }

  render() {
    return (
      <div log={console.log(this.state.redirect)}>
        {this.state.redirect && <Redirect to='/login'/>}
        <Navbar className="Navbar" light expand="md">
          <img className="CivixTitle" src={civixtitle} alt="Civix" />
          <Link className="NavButton" to="/calendar">
            <IoIosCalendar /> Calendar
          </Link>
          <Link className="NavButton" to="/issues">
            <IoMdChatboxes /> Issues
          </Link>
          <Link className="NavButton" to="/contact">
            <MdPeopleOutline /> Your Reps
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret>{localStorage.getItem("user_name")}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header><Link
                to="/account"
                style={{ color: "#000000", fontWeight: "bold" }}
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
