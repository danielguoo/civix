import React from "react"
import "./Navbar.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import IssuesBoard from "../IssuesBoard/IssuesBoard"
import Contact from "../Contact/Contact"
import MainMenu from "../MainMenu/MainMenu"
import DrawerMenu from "../DrawerMenu/DrawerMenu"

//Homepage is Main Menu
const Index = () => <MainMenu />

//Tentative plan:
//Remove navbar links; popup menu handles
//Start from main menu buttons; then use popup menu to navigate
const Navbar = () => (
  <Router>
    <div className="Navbar">
      <DrawerMenu />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Issues/">Issues</Link>
          </li>
          <li>
            <Link to="/Calendar/">Calendar</Link>
          </li>
          <li>
            <Link to="/Contact/">Contact</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Index} />
      <Route path="/Issues/" component={IssuesBoard} />
      <Route path="/Calendar/" component={Calendar} />
      <Route path="/Contact/" component={Contact} />
      <Route path="/MainMenu/" component={MainMenu} />
    </div>
  </Router>
)

export default Navbar
