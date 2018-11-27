import React, { Component } from 'react';
import './App.css';

//Router components
import { Switch, Route } from "react-router-dom"

//App components to route
import Login from "../Login/Login"
import Signup from "../Signup/Signup"
import CommunityCalendar from "../CommunityCalendar/CommunityCalendar"
import PersonalCalendar from "../PersonalCalendar/PersonalCalendar"
import IssuesBoard from "../IssuesBoard/IssuesBoard"
import PropositionPage from "../PropositionPage/PropositionPage"
import Contact from "../Contact/Contact"
import Account from "../Account/Account"

//Routes
//Default to login
class Routes extends Component {
  render() {
    return (
      <div className="app-routes">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/communitycalendar" component={CommunityCalendar} />
          <Route path="/personalcalendar" component={PersonalCalendar} />
          <Route path="/issuesboard" component={IssuesBoard} />
          <Route path="/propositionpage" component={PropositionPage} />
          <Route path="/contact" component={Contact} />
          <Route path="/account" component={Account} />
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
    );
  }
}

export default App;
