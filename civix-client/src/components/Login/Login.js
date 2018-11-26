import React from "react"
import { Button, Form, FormGroup, Input, Alert } from "reactstrap"

import "./Login.css"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

//Import logo
import civixlogo from "./civixlogo.png"

class Login extends React.Component {
  //Constructor
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      error: false
    }

    //Bind submit function
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(e) {
    //alert(JSON.stringify(this.state, null, "  "))

    e.preventDefault()

    const { username, password } = this.state

    this.setState({ error: false })

    if (!(username === "george" && password === "foreman")) {
      return this.setState({ error: true })
    } else {
      console.log("Successfully logged in.")
      //By default, take us to Community Calendar page
      this.props.history.push("/CommunityCalendar")
    }
  }

  render() {
    const { error } = this.state

    return (
      <div className="login-clean">
        <Form className="form" error={error} onSubmit={this.onFormSubmit}>
          <div className="illustration">
            <img
              className="logo"
              src={civixlogo}
              style={{ width: 200, height: 200 }}
            />
          </div>
          {error && (
            <Alert error={error} color="danger">
              Username/password combination is incorrect or does not exist.
            </Alert>
          )}
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="text"
              name="username"
              required
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="password"
              name="password"
              required
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Button
              className="btn btn-primary btn-block"
              type="submit"
              style={{ backgroundColor: "#d900ff" }}
            >
              Log In
            </Button>
          </FormGroup>
          <Link to="/signup" className="forgot">
            Not registered yet? Register here.
          </Link>
        </Form>
      </div>
    )
  }
}

export default withRouter(Login)
