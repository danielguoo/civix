import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
} from "reactstrap";
import civixtitle from "./civixtitle.png";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import {IoIosCalendar,IoMdChatboxes} from "react-icons/io";
import {MdPeopleOutline} from 'react-icons/md'

//TODO: Add icons

class NavigationBar extends React.Component {

  render() {
    return (
      <div>
        <Navbar className="Navbar" light expand="md">
          <img className="CivixTitle" src={civixtitle} alt="Civix" />
          <Link className="NavButton" to="/communitycalendar">
             <IoIosCalendar/> Calendar 
          </Link>
          <Link className="NavButton" to="/personalcalendar">
             <IoIosCalendar/> Personal Calendar
          </Link>
          <Link className="NavButton" to="/issuesboard">
            <IoMdChatboxes/> Issues 
          </Link>
          <Link className="NavButton" to="/contact">
            <MdPeopleOutline/> Your Reps 
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                to="/account"
                style={{ color: "#000000", fontWeight: "bold" }}
              >
                Account
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}


export default NavigationBar;
