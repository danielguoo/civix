import React from "react"
import "./Navbar.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Calendar from "../Calendar/Calendar"
import IssuesBoard from "../IssuesBoard/IssuesBoard"
import Contact from "../Contact/Contact"
import MainMenu from "../MainMenu/MainMenu"
import DrawerMenu from "../DrawerMenu/DrawerMenu"
import Account from "../Account/Account"

//Homepage is Main Menu
const Index = () => <MainMenu />

//Tentative plan:
//Remove navbar links; popup menu handles
//Start from main menu buttons; then use popup menu to navigate
const Navbar = () => (
  <Router>
    <div className="Navbar">
      <nav>
        <DrawerMenu />
        <ul>
          <li>
            <Link to="/Account/">Account</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={MainMenu} />
      <Route path="/Account/" component={Account} />
      <Route path="/Issues/" component={IssuesBoard} />
      <Route path="/Calendar/" component={Calendar} />
      <Route path="/Contact/" component={Contact} />
      <Route path="/MainMenu/" component={MainMenu} />
    </div>
  </Router>
)

export default Navbar
