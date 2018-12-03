import React from "react";
import { Container, Table } from "reactstrap";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Issues.css";

import { Link } from "react-router-dom";

import axios from "axios";

/**
 * Represents the Issues page.
 * @param {Object} props - React props
 */
class Issues extends React.Component {
  //Constructor
  //By default, first tab is selected
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      issues: [],
      events: []
    };
  }

  /**
   * Gets all issues and associated events using axios.
   */
  getIssues() {
    //Setup
    var eventsurl = "http://localhost:8000/events/";
    var url = "http://localhost:8000/items/";
    axios
      .all([axios.get(eventsurl), axios.get(url)])
      .then(
        axios.spread((eventsresponse, response) => {
          const issues = response.data;
          const events = eventsresponse.data;
          this.setState({ issues, events });
        })
      )
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  /**
   * React function that calls setup functions when the component is first mounted. We need to get all issues to be displayed.
   */
  componentDidMount() {
    //Grab all issues from database
    this.getIssues();
  }

  /**
   * Render issues page.
   * @return {ReactComponent} - Issues page component to display
   */
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="article-list">
          <Container className="container">
            <div className="intro">
              <h4 className="text-center">Ballot Board</h4>
            </div>
          </Container>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Related Event</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.issues.map((issue, i) => (
              <tr>
                <td>{issue.title}</td>
                <td>
                  {
                    this.state.events.find(event => event.id === issue.event)
                      .title
                  }
                </td>
                <td>{issue.description.substring(0, 15)}...</td>
                <td>
                  {" "}
                  <Link
                    to={{
                      pathname: "/issue/" + issue.id
                    }}
                  >
                    {" "}
                    Learn More{" "}
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Issues;
