import React, { Component } from 'react';
import './App.css';

//Router components
import { Switch, Route } from "react-router-dom"

//App components to route
import Login from "../Login/Login"
import Signup from "../Signup/Signup"
// import Calendar from "../Calendar/Calendar"
// import PersonalCalendar from "../PersonalCalendar/PersonalCalendar"
// import Issues from "../Issues/Issues"
// import Issue from "../Issue/Issue"
import Contact from "../Contact/Contact"
import Account from "../Account/Account"
import Forgot from "../ForgotPassword/Forgot"
//Routes
//Default to login
// <Route path="/calendar" component={Calendar} />
// <Route path="/personalcalendar" component={PersonalCalendar} />
//<Route path="/issue/" component={Issue} />
//<Route path="/issues" component={Issues} />
class Routes extends Component {
  render() {
    return (
      <div className="app-routes">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={Forgot} />


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
