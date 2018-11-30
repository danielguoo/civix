import React from "react"
import classnames from "classnames"
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap"

import NavigationBar from "../NavigationBar/NavigationBar"

import "./Issues.css"

import { Link } from "react-router-dom"

import axios from "axios"

class IssueLink extends React.Component {
  render() {
    return (
      <div>
        <li className="thread">
          <Link
            to={{
              pathname: "/issue/" + this.props.id,
              issueid: this.props.id,
              description: this.props.description
            }}
          >
            <h6 className="text-left">{this.props.title}</h6>
          </Link>
        </li>
        <hr />
      </div>
    )
  }
}

class Issues extends React.Component {
  //Constructor
  //By default, first tab is selected
  constructor(props) {
    super(props)
    this.displayIssues = this.displayIssues.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: "1",
      issues: []
    }
  }

  //Issue display function
  displayIssues(issue, i) {
    //Unpack event
    var id = issue.id
    var event = issue.event
    var title = issue.title
    var description = issue.description

    return (
      <IssueLink
        id={id}
        title={title}
        description={description}
        key={i}
        index={i}
        event={event}
      />
    )
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  getIssues() {
    //Setup
    var url = "http://localhost:8000/items/"
    axios
      .get(url)
      .then(response => {
        const issues = response.data
        this.setState({ issues })
      })
      .catch(error => {
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

  componentDidMount() {
    //Grab all issues from database
    this.getIssues()
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div className="article-list">
          <Container className="container">
            <div className="intro">
              <h2 className="text-center">Ballot Board</h2>
            </div>
          </Container>
        </div>
        <Container className="container">
          <Row>
            <Col md="12" className="col-md-12">
              <div>
                <ul className="thread-list">
                  {this.state.issues.map(this.displayIssues)}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Issues