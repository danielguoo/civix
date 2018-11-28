import React from "react"
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Badge,
  Alert,
  Label,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem
} from "reactstrap"

import "./PropositionPage.css"

import axios from "axios"

import NavigationBar from "../NavigationBar/NavigationBar"

class Comment extends React.Component {
  //Constructor
  constructor(props) {
    super(props)
    this.state = {
      upvotes: this.props.upvotes,
      downvotes: this.props.downvotes
    }

    //Bind functions for performing upvotes, downvotes
    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
  }

  updateComments() {
    //Setup
    var url = "http://localhost:8000/posts/"
    var payload = {
      id: this.props.id,
      item: this.props.item,
      user: this.props.user,
      content: this.props.content,
      upvotes: this.state.upvotes,
      downvotes: this.state.downvotes
    }
    //Attempt update
    axios
      .put(url, payload)
      .then(function(response) {
        console.log("Successfully updated post with status " + response.status)
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
      })
  }

  upvote() {
    this.setState({ upvotes: this.state.upvotes + 1 })
    this.updateComments()
  }

  downvote() {
    this.setState({ downvotes: this.state.downvotes + 1 })
    this.updateComments()
  }

  render() {
    return (
      <div className="commentContainer">
        <h6 className="text-left">{this.props.user}</h6>
        <div className="commentText">{this.props.content}</div>
        <div className="text-right">
          <Badge
            onClick={this.upvote}
            style={{ background: "#ff0000", marginRight: 5 }}
          >
            {this.state.upvotes}
          </Badge>
          <Badge onClick={this.downvote} style={{ background: "#22c25c" }}>
            {this.state.downvotes}
          </Badge>
        </div>
      </div>
    )
  }
}

class ForList extends React.Component {
  render() {
    return (
      <ListGroup className="list-group">
        <ListGroupItem className="list-group-item" style={{ marginBottom: 6 }}>
          <p style={{ color: "#000000" }}>
            <b>Sara Doe</b>: Supportive argument for proposition. <br />
          </p>
          <ButtonGroup className="btn-group" role="group">
            <Button color="primary" className="btn, btn-primary">
              Upvote <Badge style={{ backgroundColor: "#7fdc4f" }}>4</Badge>
            </Button>
            <Button color="primary" className="btn, btn-primary" type="button">
              Downvote <Badge style={{ backgroundColor: "#ff3a45" }}>2</Badge>
            </Button>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

class AgainstList extends React.Component {
  render() {
    return (
      <ListGroup className="list-group">
        <ListGroupItem className="list-group-item" style={{ marginBottom: 6 }}>
          <p style={{ color: "#000000" }}>
            <b>Phillip Brill</b>: Argument against proposition. <br />
          </p>
          <ButtonGroup className="btn-group" role="group">
            <Button color="primary" className="btn, btn-primary">
              Upvote <Badge style={{ backgroundColor: "#7fdc4f" }}>4</Badge>
            </Button>
            <Button color="primary" className="btn, btn-primary" type="button">
              Downvote <Badge style={{ backgroundColor: "#ff3a45" }}>2</Badge>
            </Button>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

class PropositionPage extends React.Component {
  //Constructor
  constructor(props) {
    super(props)
    this.displayComments = this.displayComments.bind(this)
    this.addNewComment = this.addNewComment.bind(this)
    this.getNewCommentText = this.getNewCommentText.bind(this)
    this.getNewCommentOnRight = this.getNewCommentOnRight.bind(this)
    this.state = {
      forcomments: [],
      againstcomments: [],
      newCommentText: "",
      newCommentOnRight: false
    }
  }

  //store new comment content
  getNewCommentText(e) {
    this.setState({ newCommentText: e.target.value })
  }

  //store new comment alignment (for/against)
  getNewCommentOnRight(e) {
    if (e.target.value === "For") {
      this.setState({ newCommentOnRight: false })
    } else {
      this.setState({ newCommentOnRight: true })
    }
  }

  addNewComment() {
    var newText = this.state.newCommentText
    if (newText !== "") {
      var newOnRight = this.state.newCommentOnRight
      var newcomment = {
        user: "2",
        content: newText,
        onRight: newOnRight,
        upvotes: 0,
        downvotes: 0
      }
      if (!newOnRight) {
        var forarr = this.state.forcomments
        forarr.push(newcomment)
        this.setState({ forcomments: forarr })
      } else {
        var againstarr = this.state.againstcomments
        againstarr.push(newcomment)
        this.setState({ againstcomments: againstarr })
      }

      //Setup
      var url = "http://localhost:8000/posts/"
      var payload = {
        item: this.props.location.issueid,
        user: "2",
        content: newText,
        onRight: newOnRight,
        upvotes: 0,
        downvotes: 0
      }

      //Attempt addition
      axios
        .post(url, payload)
        .then(function(response) {
          console.log(
            "Successfully updated post with status " + response.status
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
          }
        })
    } else {
      alert("Comment must be nonempty.")
    }
  }

  //Comment display function
  displayComments(comment, i) {
    //Unpack comment
    var id = comment.id
    var item = comment.item
    var user = comment.user
    var content = comment.content
    var upvotes = comment.upvotes
    var downvotes = comment.downvotes

    return (
      <Comment
        id={id}
        item={item}
        user={user}
        content={content}
        upvotes={upvotes}
        downvotes={downvotes}
        key={i}
        index={i}
      />
    )
  }

  getComments() {
    //Setup
    var url = "http://localhost:8000/posts/"
    var self = this
    axios
      .get(url)
      .then(response => {
        var allcomments = response.data
        //filter out only those linked to issue id
        var pagecomments = allcomments.filter(function(e) {
          return e.item === self.props.location.issueid
        })
        //split into those for and those against
        var forcomments = pagecomments.filter(function(e) {
          return e.onRight === false
        })
        var againstcomments = pagecomments.filter(function(e) {
          return e.onRight === true
        })

        this.setState({ forcomments: forcomments })
        this.setState({ againstcomments: againstcomments })
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
    this.getComments()
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div className="article-list">
          <Container className="container">
            <div className="intro">
              <h2 className="text-center">Proposition #</h2>
              <h4>short title.</h4>
            </div>
          </Container>
          <Row>
            <Col xs="6" sm="3">
              <h3>For</h3>
              {this.state.forcomments.map(this.displayComments)}
            </Col>
            <Col xs="6" sm="6">
              <h4>Description</h4>
              <p>{this.props.location.description}</p>
              <br />
              <div className="shareCommentContainer">
                <textarea
                  value={this.state.newCommentText}
                  onChange={this.getNewCommentText}
                  placeholder="Write a comment.."
                />
                <div>
                  <button
                    onClick={this.addNewComment}
                    className="btn btn-success text-left"
                  >
                    Share
                  </button>
                  <div className="text-right">
                    <Row style={{ marginLeft: 30 }}>
                      <Label>
                        <Input
                          type="radio"
                          name="for"
                          value="For"
                          checked={this.state.newCommentOnRight === false}
                          onChange={this.getNewCommentOnRight}
                        />
                        For
                      </Label>
                    </Row>
                    <Row style={{ marginLeft: 30 }}>
                      <Label>
                        <Input
                          type="radio"
                          name="against"
                          value="Against"
                          checked={this.state.newCommentOnRight === true}
                          onChange={this.getNewCommentOnRight}
                        />
                        Against
                      </Label>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm="3">
              <h3>Against</h3>
              {this.state.againstcomments.map(this.displayComments)}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default PropositionPage
