import React, { Component } from "react"
import "./App.css"

//Router components
import { Switch, Route, } from "react-router-dom"

//App components to route
import Login from "../Login/Login"
import Signup from "../Signup/Signup"
import Calendar from "../Calendar/Calendar"
import Issues from "../Issues/Issues"
import Issue from "../Issue/Issue"
import Contact from "../Contact/Contact"
import Account from "../Account/Account"

/**
 * Represents the overall Civix application.
 */
class App extends Component {
  /**
   * Renders a properly routed application component.
   * @return {ReactComponent} - The application component to display
   */
  render() {
    return (
      <div className="app-routes">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/issues" component={Issues} />
          <Route path="/issue/:id" component={Issue} />
          <Route path="/contact" component={Contact} />
          <Route path="/account" component={Account} />
          <Route path="/" component={ localStorage.getItem("user_id") ? Calendar : Login} />
        </Switch>
      </div>
    )
  }
}

export default App
