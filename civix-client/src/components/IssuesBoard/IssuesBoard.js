import React from "react"
import classnames from "classnames"

import NavigationBar from "../NavigationBar/NavigationBar"

import { Link } from "react-router-dom"

import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"

import "./IssuesBoard.css"

class IssuesBoard extends React.Component {
  //Constructor
  //By default, first tab is selected
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: "1"
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
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
                <Nav tabs className="nav nav-tabs">
                  <NavItem className="nav-item">
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1")
                      }}
                    >
                      Propositions
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2")
                      }}
                    >
                      Candidates
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  className="tab-content"
                  activeTab={this.state.activeTab}
                >
                  <TabPane tabId="1">
                    <ul className="thread-list">
                      <Link to="/propositionpage">
                        <li className="thread">
                          <span className="title" style={{ float: "left" }}>
                            Proposition 15{" "}
                          </span>
                          <span className="icon">Icon </span>
                        </li>
                      </Link>
                      <li className="thread">
                        <span className="title" style={{ float: "left" }}>
                          Proposition 24{" "}
                        </span>
                        <span className="icon">Icon </span>
                      </li>
                    </ul>
                  </TabPane>
                  <TabPane tabId="2">
                    <ul className="thread-list">
                      <li className="thread">
                        <span className="title" style={{ float: "left" }}>
                          John H.{" "}
                        </span>
                        <span className="icon">Icon </span>
                      </li>
                      <li className="thread">
                        <span className="title" style={{ float: "left" }}>
                          Sam B.{" "}
                        </span>
                        <span className="icon">Icon </span>
                      </li>
                    </ul>
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default IssuesBoard
