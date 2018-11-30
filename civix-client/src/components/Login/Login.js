import React from "react"
import { Button, Form, FormGroup, Input, Alert } from "reactstrap"

import "./Login.css"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import civixlogo from "./civixlogo.png"
import posed from "react-pose"

import axios from "axios"

//Animation setup for logo
const Logo = posed.img({
  hoverable: true,
  init: {
    scale: 1
  },
  hover: {
    scale: 1.05
  }
})

class Login extends React.Component {
  //Constructor
  constructor(props) {
    super()
    this.state = {
      username: "",
      password: "",
      error: false
    }
    //Bind submit function
    this.assignUser = props.assignUser
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  //Submit function
  onFormSubmit(e) {
    //Setup
    e.preventDefault()
    this.setState({ error: false })

    //Attempt login
    var url = "http://localhost:8000/rest-auth/login/"
    var payload = {
      username: this.state.username,
      password: this.state.password
    }
    var self = this
    console.log(self.props)
    //Attempt login
    axios
      .post(url, payload)
      .then(function(response) {
        console.log("Successfully logged in with status " + response.status)
        //store user key/ID/name
        //we do this in signup, but do it again just in case
        self.props.assignUser(response.data.user)
        global.user_key = response.data.key
        global.user_id = response.data.user
        global.user_name = self.state.username
        self.props.history.push("/Calendar")
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message)
        }
        self.setState({ error: true })
      })
  }

  render() {
    //Grab error flag
    const { error } = this.state
    console.log(this)
    return (
      <div log={console.log(this.props)} className="login-clean">
        <Form className="form" error={error} onSubmit={this.onFormSubmit}>
          <div className="illustration">
            <Logo src={civixlogo} style={{ width: 200, height: 200 }} />
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
              style={{ background: "#d900ff", marginLeft: "auto" }}
              className="btn btn-primary btn-block"
              type="submit"
            >
              Log In
            </Button>
          </FormGroup>
          <Link to="/signup" style={{ color: "#515a63" }} className="forgot">
            Not registered yet? Register here.
          </Link>
        </Form>
      </div>
    )
  }
}

export default withRouter(Login)
