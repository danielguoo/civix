import React, { Component } from "react";
import "./App.css";

//Router components
import { Switch, Route } from "react-router-dom";

//App components to route
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Calendar from "../Calendar/Calendar";
import PersonalCalendar from "../PersonalCalendar/PersonalCalendar";
import Issues from "../Issues/Issues";
import Issue from "../Issue/Issue";
import Contact from "../Contact/Contact";
import Account from "../Account/Account";

//Routes
//Default to login
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.assignUser = this.assignUser.bind(this);
  }

  assignUser(account) {
    this.setState((state) => ({
      user: account
    }));
    console.log(this.state)
  }

  render() {
    const assignUser = this.assignUser

    return (
      <div className="app-routes">
        <Switch>
          <Route log={console.log(this)} path="/login" render={() => <Login assignUser={assignUser} ohoho="abc" />} />
          <Route path="/signup" component={Signup} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/personalcalendar" component={PersonalCalendar} />
          <Route path="/issues" component={Issues} />
          <Route path="/issue/:id" component={Issue} />
          <Route path="/contact" component={Contact} />
          <Route path="/account" component={Account} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
