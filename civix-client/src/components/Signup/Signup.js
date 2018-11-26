import React from "react"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"
import "./Signup.css"

import { Link } from "react-router-dom"

class Signup extends React.Component {
  render() {
    return (
      <div className="login-clean">
        <Form className="form">
          <h1 class="text-center">Register</h1>
          <div class="illustration" />
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="text"
              name="username"
              required
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="password"
              name="password"
              required
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="email"
              name="email"
              required
              placeholder="Email"
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
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Input
              className="form-control"
              type="text"
              name="address"
              required
              placeholder="Address"
            />
          </FormGroup>
          <FormGroup className="form-group" tag="fieldset">
            <FormText className="formtext">Political Affiliation</FormText>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="democrat"
                  className="form-check-input"
                />{" "}
                Democrat
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Republican
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> Independent
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup className="form-group">
            <Button
              className="btn btn-primary btn-block"
              type="submit"
              style={{ backgroundColor: "#d900ff" }}
            >
              Sign Up
            </Button>
          </FormGroup>
          <Link to="/login" className="forgot">
            Back to login
          </Link>
        </Form>
      </div>
    )
  }
}

export default Signup

class Example extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMulti">Select Multiple</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            multiple
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Radio Buttons</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> Option one is this and
              that—be sure to include why it's great
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> Option two can be something
              else and selecting it will deselect option one
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio1" disabled /> Option three is
              disabled
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> Check me out
          </Label>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    )
  }
}
