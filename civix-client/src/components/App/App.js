import React, { Component } from "react"
import "./App.css"
import "../Navbar/Navbar"
import Navbar from "../Navbar/Navbar"
import Calendar from "../Calendar/Calendar"
import MainMenu from "../MainMenu/MainMenu"
import Contact from "../Contact/Contact"
import Account from "../Account/Account"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <MainMenu />
      </div>
    )
  }
}

export default App
