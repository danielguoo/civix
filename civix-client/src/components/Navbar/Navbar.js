import React from "react";
import './Navbar.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Calendar from "../Calendar/Calendar"
import IssuesBoard from '../IssuesBoard/IssuesBoard'
import Contact from '../Contact/Contact'
import MainMenu from '../MainMenu/MainMenu'

const Index = () => <h2>Home</h2>

const Navbar = () => (
  <Router>
    <div className="Navbar">
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
          <li>
            <Link to="/MainMenu/">MainMenu</Link>
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
);

export default Navbar;