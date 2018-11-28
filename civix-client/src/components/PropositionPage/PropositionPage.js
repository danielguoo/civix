import React from "react"
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Badge,
  Alert,
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

  upvote() {
    this.setState({ upvotes: this.state.upvotes + 1 })
  }

  downvote() {
    this.setState({ downvotes: this.state.downvotes + 1 })
  }

  render() {
    return (
      <div className="commentContainer">
        <div className="commentText">{this.props.children}</div>
        <div className="text-right">
          <Badge
            onClick={this.upvote}
            style={{ background: "#ff0000", marginRight: 5 }}
          >
            <span className="fa fa-pencil fa-2x" />
            {this.state.upvotes}
          </Badge>
          <Badge onClick={this.downvote} style={{ background: "#00ff00" }}>
            <span className="fa fa-trash fa-2x" />
            {this.state.downvotes}
          </Badge>
        </div>
      </div>
    )
  }
}

class CommentThread extends React.Component {
  constructor(props) {
    super(props)
    this.displayComments = this.displayComments.bind(this)
    this.addNewComment = this.addNewComment.bind(this)
    this.getCurrentComment = this.getCurrentComment.bind(this)
    this.state = {
      comments: [],
      currentcomment: ""
    }
  }

  //store current text value in comment box
  getCurrentComment(e) {
    this.setState({ currentcomment: e.target.value })
  }

  addNewComment() {
    var newText = this.state.currentcomment
    if (newText !== "") {
      var arr = this.state.comments
      arr.push(newText)
      this.setState({ comments: arr })
    } else {
      alert("Comment must be nonempty.")
    }
  }

  //Comment display function
  displayComments(comment, i) {
    //Unpack comment
    var id = comment.id
    var username = comment.username
    var text = comment.text
    var upvotes = comment.upvotes
    var downvotes = comment.downvotes

    return (
      <Comment
        id={id}
        username={username}
        text={text}
        upvotes={upvotes}
        downvotes={downvotes}
        key={i}
        index={i}
      />
    )
  }

  render() {
    return (
      <div className="board">
        <div className="shareCommentContainer">
          <textarea
            value={this.state.currentcomment}
            onChange={this.getCurrentComment}
            placeholder="Write a comment.."
          />
          <button onClick={this.addNewComment} className="btn btn-success">
            {" "}
            Share
          </button>
        </div>

        {this.state.comments.map(this.displayComments)}
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
    this.state = {
      comments: []
    }
  }

  getComments() {
    //Setup
    var url = "http://localhost:8000/posts/"
    axios
      .get(url)
      .then(response => {
        const events = response.data

        this.setState({ events })
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
              <h2 className="text-center">Proposition Page</h2>
            </div>
          </Container>
          <Row>
            <Col xs="6" sm="4">
              <h3>For</h3>
              <CommentThread />
            </Col>
            <Col xs="6" sm="4">
              <h4>Description</h4>
              <p>A description of the proposition.</p>
            </Col>
            <Col sm="4">
              <h3>Against</h3>
              <CommentThread />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default PropositionPage
