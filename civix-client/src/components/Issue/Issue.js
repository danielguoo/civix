import React from "react";
import {
  Row,
  Col,
  Badge,
  Alert,
  Label,
  Input,
} from "reactstrap";
import {IoIosThumbsUp, IoIosThumbsDown} from 'react-icons/io'

import "./Issue.css";

import axios from "axios";

import NavigationBar from "../NavigationBar/NavigationBar";

class Comment extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      upvotes: this.props.upvotes,
      downvotes: this.props.downvotes
    };

    //Bind functions for performing upvotes, downvotes
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  updateComments() {
    /*alert(
      "updating, now with " +
        this.state.upvotes +
        " upvotes and " +
        this.state.downvotes +
        " downvotes..."
    )*/
    //Setup
    var url = "http://localhost:8000/posts/" + this.props.id + "/"
    var payload = {
      id: this.props.id,
      item: this.props.item,
      user: this.props.user,
      content: this.props.content,
      upvotes: this.state.upvotes,
      downvotes: this.state.downvotes
    }
    //alert("id is " + payload.id + ", item is " + payload.item)
    //Attempt update
    axios
      .put(url, payload)
      .then(function(response) {
        console.log("Successfully updated post with status " + response.status);
      })
      .catch(function(error) {
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

  upvote() {
    this.setState({ upvotes: this.state.upvotes + 1 }, function() {
      //alert("upvotes now " + this.state.upvotes)
      this.updateComments()
    })
  }

  downvote() {
    this.setState({ downvotes: this.state.downvotes + 1 }, function() {
      //alert("downvotes now " + this.state.downvotes)
      this.updateComments()
    })
  }

  render() {
    return (
      <div className="commentContainer">
        <h6 className="text-left">{this.props.username}</h6>
        <div className="commentText">{this.props.content}</div>
        <div className="text-right">
          <Badge
            onClick={this.upvote}
            style={{ background: "#22c25c", marginRight: 5 }}
          >
            <IoIosThumbsUp/> {this.state.upvotes}
          </Badge>
          <Badge onClick={this.downvote} style={{ background: "#ff0000" }}>
          <IoIosThumbsDown/> {this.state.downvotes} 
          </Badge>
        </div>
      </div>
    );
  }
}

class Issue extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.displayComments = this.displayComments.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.getNewCommentText = this.getNewCommentText.bind(this);
    this.getNewCommentOnRight = this.getNewCommentOnRight.bind(this);
    this.state = {
      forcomments: [],
      againstcomments: [],
      commentusers: [],
      newCommentText: "",
      newCommentOnRight: false,
      error: false
    }
  }

  //store new comment content
  getNewCommentText(e) {
    this.setState({ newCommentText: e.target.value });
  }

  //store new comment alignment (for/against)
  getNewCommentOnRight(e) {
    if (e.target.value === "For") {
      this.setState({ newCommentOnRight: false });
    } else {
      this.setState({ newCommentOnRight: true });
    }
  }

  addNewComment() {
    var newText = this.state.newCommentText;
    if (newText !== "") {
      this.setState({ error: false })
      var newOnRight = this.state.newCommentOnRight
      var self = this

      //Setup
      var url = "http://localhost:8000/posts/"
      //alert("issueid is " + this.props.location.issueid)
      var payload = {
        item: this.props.location.pathname.substring(-1),
        user: global.user_id,
        content: newText,
        onRight: newOnRight,
        upvotes: 0,
        downvotes: 0
      };

      //Attempt addition
      axios
        .post(url, payload)
        .then(function(response) {
          console.log(
            "Successfully created new post with status " + response.status
          )
          if (!newOnRight) {
            var forarr = self.state.forcomments
            forarr.push(response.data)
            self.setState({ forcomments: forarr })
          } else {
            var againstarr = self.state.againstcomments
            againstarr.push(response.data)
            self.setState({ againstcomments: againstarr })
          }
          var commentusers = self.state.commentusers
          //alert("userid: " + global.user_id + ", username: " + global.user_name)
          var newcommentuser = {
            id: global.user_id,
            username: global.user_name
          }
          if (commentusers.indexOf(newcommentuser) === -1) {
            commentusers.push(newcommentuser)
          }
          self.setState({ commentusers: commentusers })
        })
        .catch(function(error) {
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
    } else {
      this.setState({ error: true })
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
    var commentusers = this.state.commentusers
    var username = ""

    commentusers.forEach(function(commentuser) {
      if (commentuser.id === user) {
        username = commentuser.username
        //alert("loaded in value " + username)
      }
    })

    return (
      <Comment
        id={id}
        item={item}
        user={user}
        username={username}
        content={content}
        upvotes={upvotes}
        downvotes={downvotes}
        key={i}
        index={i}
      />
    );
  }
  getComments() {
    //Setup
    var url = "http://localhost:8000/posts/"
    var self = this
    var allcomments = []

    axios
      .get(url)
      .then(response => {
        allcomments = response.data
      })
      .then(function() {
        var commentusers = []
        var promises = []
        //alert("Attempting pushing all events")

        //filter out only those linked to issue id
        var pagecomments = allcomments.filter(function(e) {
          return e.item === parseInt(self.props.location.pathname.substr(-1))
        })

        //get all associated users as well
        pagecomments.forEach(function(comment) {
          var commenturl = "http://localhost:8000/users/" + comment.user + "/"
          promises.push(axios.get(commenturl))
        })

        axios.all(promises).then(function(results) {
          results.forEach(function(response) {
            commentusers.push(response.data)
          })

          //split into those for and those against
          var forcomments = pagecomments.filter(function(e) {
            return e.onRight === false
          })
          var againstcomments = pagecomments.filter(function(e) {
            return e.onRight === true
          })

          self.setState({ forcomments: forcomments })
          self.setState({ againstcomments: againstcomments })
          self.setState({ commentusers: commentusers })
        })
      })
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

  componentDidMount() {
    this.getComments();
  }

  render() {
    //Grab error flag
    const error = this.state.error
    return (
      <div>
        <NavigationBar />
        <div className="article-list">
          <Row>
            <Col xs="6" sm="3">
              <h3 className="issueSide">For</h3>
              {this.state.forcomments.map(this.displayComments)}
            </Col>
            <Col xs="6" sm="6">
              <div className="intro">
                <h2 className="text-center">{this.props.title}</h2>
                <h4>short title.</h4>
              </div>
              <h4>Description</h4>
              <p>{this.props.location.description}</p>
              <br />
              {error && <Alert color="danger">Comment must be nonempty.</Alert>}
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
              <h3 className="issueSide">Against</h3>
              {this.state.againstcomments.map(this.displayComments)}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Issue;
