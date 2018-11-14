import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AppBar from "material-ui/AppBar"
import AppBarDrawer from "./AppBarDrawer.js"
import Button from "@material-ui/core/Button"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleAppMenuClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title={"Civix"}
            onLeftIconButtonClick={this.handleAppMenuClick.bind(this)}
            onClick={this.handleAppMenuClick.bind(this)}
          >
            <Button
              style={{
                textTransform: "none",
                fontWeight: "bold",
                color: "white"
              }}
            >
              Account
            </Button>
          </AppBar>
          <AppBarDrawer open={this.state.open} />
        </MuiThemeProvider>
      </div>
    )
  }
}
export default Navbar
/*
//Tentative plan:
//Remove navbar links; popup menu handles
//Start from main menu buttons; then use popup menu to navigate
const Navbar = () => (
  <Router>
    <div className="Navbar">
      <DrawerMenu />
      <nav>
        <DrawerMenu />
        <ul>
          <li>
            <Link to="/Account/">Account</Link>
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

export default Navbar*/
