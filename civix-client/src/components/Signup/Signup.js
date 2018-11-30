import React from "react"
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from "reactstrap"

import axios from "axios"

import "./Signup.css"

import { Link } from "react-router-dom"

class Signup extends React.Component {
  //Constructor
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      address: "",
      poliID: "",
      error: false,
      success: false
    }

    //Bind submit function
    this.onFormSubmit = this.onFormSubmit.bind(this)
    //Bind radio button selection function
    this.onRadioSelect = this.onRadioSelect.bind(this)
  }

  //Submit function
  onFormSubmit(e) {
    //Setup
    e.preventDefault()

    var url = "http://localhost:8000/rest-auth/registration/"
    var fulladdress = this.state.address.split(", ")
    var payload = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      dob: this.state.dob,
      streetaddress: this.state.fulladdress[0],
      city: this.state.fulladdress[1],
      state: this.state.fulladdress[2],
      zipcode: this.state.fulladdress[3],
      poliID: this.state.poliID
    }
    var self = this

    //Attempt login
    axios
      .post(url, payload)
      .then(function(response) {
        self.setState({ success: true })
        console.log(
          "Successfully stored registration information with status " +
            response.status
        )
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
          self.setState({ error: true })
        }
      })
  }

  //Radio button select function
  onRadioSelect(e) {
    this.setState({
      poliID: e.target.value
    })
  }

  render() {
    //Grab error/success flags
    const { error } = this.state
    const { success } = this.state

    return (
      <div className="login-clean">
        <Form className="form">
          <h1 className="text-center">Register</h1>
          <div className="illustration" />
          {success && (
            <Alert error={error} color="danger">
              Registration successful.
            </Alert>
          )}
          {error && (
            <Alert error={error} color="danger">
              Registration not successful. Try again.
            </Alert>
          )}
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="text"
              name="username"
              required
              placeholder="Username"
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
              onChange={e => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <FormText className="formtext">Date of Birth</FormText>
            <Input
              className="form-control"
              type="date"
              name="birthdate"
              required
              placeholder="Date of birth"
              onChange={e => this.setState({ dob: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="text"
              name="address"
              required
              placeholder="Address (Street, City, State, Zipcode)"
              onChange={e => this.setState({ address: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="form-group" tag="fieldset">
            <FormText className="formtext">Political Affiliation</FormText>
            <br />
            <div className="radioGroup">
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <Label>
                    <Input
                      type="radio"
                      name="democrat"
                      value="Democrat"
                      checked={this.state.poliID === "Democrat"}
                      onChange={this.onRadioSelect}
                    />
                    Democrat
                  </Label>
                </li>
                <li>
                  <Label>
                    <Input
                      type="radio"
                      name="republican"
                      value="Republican"
                      checked={this.state.poliID === "Republican"}
                      onChange={this.onRadioSelect}
                    />
                    Republican
                  </Label>
                </li>
                <li>
                  <Label>
                    <Input
                      type="radio"
                      name="independent"
                      value="Independent"
                      checked={this.state.poliID === "Independent"}
                      onChange={this.onRadioSelect}
                    />
                    Independent
                  </Label>
                </li>
              </ul>
            </div>
          </FormGroup>
          <FormGroup className="form-group">
            <Button
              className="btn btn-primary btn-block"
              type="submit"
              style={{ backgroundColor: "#d900ff", marginLeft: "auto" }}
            >
              Sign Up
            </Button>
          </FormGroup>
          <Link to="/login" style={{ color: "#515a63" }} className="forgot">
            Back to login
          </Link>
        </Form>
      </div>
    )
  }
}

export default Signup
