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

import "./Signup.css"

import { Link } from "react-router-dom"

import axios from "axios"

class Signup extends React.Component {
  //Constructor
  constructor() {
    super()
    this.state = {
      user: "",
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

    var registrationurl = "http://localhost:8000/rest-auth/registration/"
    var registrationpayload = {
      username: this.state.username,
      password1: this.state.password,
      password2: this.state.password,
      email: this.state.email
    }

    var self = this

    //Attempt registration
    axios
      .post(registrationurl, registrationpayload)
      .then(function(registrationresponse) {
        self.setState({ success: true })
        console.log(
          "Successfully stored registration information with status " +
            registrationresponse.status
        )
        //store user key/ID/name
        localStorage.setItem('user_key', registrationresponse.data.key)
        localStorage.setItem('user_id', registrationresponse.data.user)
        localStorage.setItem('user_name',  self.state.username)
      })
      .then(function() {
        //Attempt profile creation
        var profileurl = "http://localhost:8000/profiles/"
        var fulladdress = self.state.address.split(", ")
        var profilepayload = {
          user: localStorage.getItem('user_id'),
          dob: self.state.dob,
          poliID: self.state.poliID,
          streetAddress: fulladdress[0],
          city: fulladdress[1],
          zipcode: fulladdress[3],
          state: fulladdress[2]
        }
        //Attempt concurrent profile creation
        axios.post(profileurl, profilepayload).then(function(profileresponse) {
          console.log("Successfully created profile for user " + global.user_id)
        })

        //Attempt concurrent calendar creation
        var calendarurl = "http://localhost:8000/calendars/"
        var calendarpayload = {
          user: localStorage.getItem('user_id'),
          events: []
        }

        axios
          .post(calendarurl, calendarpayload)
          .then(function(calendarresponse) {
            console.log(
              "Successfully created personal calendar for user " +
                localStorage.getItem('user_id')
            )
          })
      })
      .catch(function(error) {
        self.setState({ error: true })
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
        <Form log={console.log(error)} className="form">
          <h1 className="text-center">Register</h1>
          <div className="illustration" />
          {success && <Alert color="success">Registration successful.</Alert>}
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
              onClick={this.onFormSubmit}
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
