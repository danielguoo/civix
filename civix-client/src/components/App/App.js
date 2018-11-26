import React, { Component } from "react"
import "./App.css"
import { Switch, Route, Link } from "react-router-dom"

import IssuesBoard from "../IssuesBoard/IssuesBoard"
import Contact from "../Contact/Contact"
import Account from "../Account/Account"
import Login from "../Login/Login"
import Signup from "../Signup/Signup"
import CommunityCalendar from "../CommunityCalendar/CommunityCalendar"
import PersonalCalendar from "../PersonalCalendar/PersonalCalendar"
import PropositionPage from "../PropositionPage/PropositionPage"

//Application routes
//Default is login page; routing errors will lead back here
class Routes extends Component {
  render() {
    return (
      <div className="app-routes">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/account" component={Account} />
          <Route path="/contact" component={Contact} />
          <Route path="/communitycalendar" component={CommunityCalendar} />
          <Route path="/personalcalendar" component={PersonalCalendar} />
          <Route path="/issuesboard" component={IssuesBoard} />
          <Route path="/propositionpage" component={PropositionPage} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    )
  }
}

export default App
