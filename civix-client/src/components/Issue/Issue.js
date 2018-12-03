import React from "react";
import { Row, Col, Badge, Alert, Label, Input } from "reactstrap";
import { IoIosThumbsUp, IoIosThumbsDown } from "react-icons/io";

import "./Issue.css";

import axios from "axios";

import NavigationBar from "../NavigationBar/NavigationBar";

class Comment extends React.Component {
  //Constructor

  updateComments(upvote) {
    /*alert(
      "updating, now with " +
        this.state.upvotes +
        " upvotes and " +
        this.state.downvotes +
        " downvotes..."
    )*/
    //Setup
    var url = "http://localhost:8000/posts/" + this.props.id + "/";
    var self = this
    const newUp = upvote ? this.props.upvotes + 1 : this.props.upvotes
    const newDown = upvote ? this.props.downvotes : this.props.downvotes + 1
    var payload = {
      id: this.props.id,
      item: this.props.item,
      user: this.props.user,
      content: this.props.content,
      upvotes: newUp,
      downvotes: newDown
    };
    //alert("id is " + payload.id + ", item is " + payload.item)
    //Attempt update
    axios
      .put(url, payload)
      .then(function(response) {
        console.log("Successfully updated post with status " + response.status);
        self.props.getComments()
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

  render() {
    return (
      <div className="commentContainer">
        <div className="commentinfo">
          <h6 className="text-left">{this.props.username}</h6>
          <div>
            <Badge
              onClick={()=>this.updateComments(true)}
              style={{ background: "#22c25c", marginRight: 5 }}
            >
              <IoIosThumbsUp /> {this.props.upvotes}
            </Badge>
            <Badge onClick={()=>this.updateComments(false)} style={{ background: "#ff0000" }}>
              <IoIosThumbsDown /> {this.props.downvotes}
            </Badge>
          </div>
        </div>
        <div className="commentText">{this.props.content}</div>
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
    this.getComments = this.getComments.bind(this);
    this.state = {
      forcomments: [],
      againstcomments: [],
      newCommentText: "",
      newCommentOnRight: false,
      error: false,
      users: [],
      description: "",
      title: ""
    };
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

  addNewComment(user) {
    var newText = this.state.newCommentText;
    if (newText !== "" && newText.length <= 280) {
      this.setState({ error: false });
      var newOnRight = this.state.newCommentOnRight;
      var self = this;

      //Setup
      var url = "http://localhost:8000/posts/";
      //alert("issueid is " + this.props.location.issueid)
      var payload = {
        item: parseInt(this.props.location.pathname.substr(-1)),
        user: parseInt(localStorage.getItem("user_id")),
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
          );
          if (!newOnRight) {
            var forarr = self.state.forcomments;
            forarr.push(response.data);
            self.setState({ forcomments: forarr });
          } else {
            var againstarr = self.state.againstcomments;
            againstarr.push(response.data);
            self.setState({ againstcomments: againstarr });
          }
          console.log(this.state.forcomments, this.state.againstcomments)
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
      this.setState({ error: true });
    }
    this.setState({ newCommentText: "" });
    this.getComments()
  }

  //Comment display function
  displayComments(comment, i) {
    //Unpack comment
    var id = comment.id;
    var item = comment.item;
    var user = comment.user;
    var content = comment.content;
    var upvotes = comment.upvotes;
    var downvotes = comment.downvotes;
    var username = this.state.users.find(user => user.id === comment.user)
      .username;

    return (
      <Comment
        getComments={this.getComments}
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
    var userurl = "http://localhost:8000/users/";
    var eventurl =
      "http://localhost:8000/items/" +
      parseInt(this.props.location.pathname.substr(-1));
    var url = "http://localhost:8000/posts/";
    var self = this;
    var allcomments = [];

    axios
      .all([axios.get(userurl), axios.get(url), axios.get(eventurl)])

      .then(
        axios.spread((userresponse, response, eventresponse) => {
          const users = userresponse.data;
          const title = eventresponse.data.title;
          const description = eventresponse.data.description;
          this.setState({ users, title, description });
          allcomments = response.data;
          var pagecomments = allcomments.filter(function(e) {
            return e.item === parseInt(self.props.location.pathname.substr(-1));
          });
          var forcomments = pagecomments.filter(function(e) {
            return e.onRight === false;
          });
          var againstcomments = pagecomments.filter(function(e) {
            return e.onRight === true;
          });

          self.setState({ forcomments: forcomments });
          self.setState({ againstcomments: againstcomments });
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

  componentDidMount() {
    this.getComments();
  }

  render() {
    //Grab error flag
    const error = this.state.error;
    return (
      <div>
        <NavigationBar />
        <div className="article-list">
          <Row>
            <Col xs="6" sm="4">
              <h3 className="issueSide">For</h3>
              <div className="scrolling">
                {" "}
                {this.state.forcomments
                  .sort(
                    (a, b) => b.upvotes - b.downvotes - a.upvotes + a.downvotes
                  )
                  .map(this.displayComments)}{" "}
              </div>
            </Col>
            <Col xs="6" sm="4">
              <div className="intro">
                <h4 className="text-center">{this.state.title}</h4>
              </div>
              <h4>Description:</h4>
              <p>{this.state.description}</p>
              <br />
              {error && (
                <Alert color="danger">
                  Comment must be nonempty and a maximum of 280 characters.
                </Alert>
              )}
              <div className="shareCommentContainer">
                <textarea
                  value={this.state.newCommentText}
                  onChange={this.getNewCommentText}
                  placeholder="Write a comment.."
                />
                <div
                  style={{ float: "right", marginRight: 5, fontWeight: "bold" }}
                >
                  {280 - this.state.newCommentText.length >= 0
                    ? 280 - this.state.newCommentText.length
                    : 0}
                </div>
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
            <Col sm="4">
              <h3 className="issueSide">Against</h3>
              <div className="scrolling">
                {" "}
                {this.state.againstcomments
                  .sort(
                    (a, b) => b.upvotes - b.downvotes - a.upvotes + a.downvotes
                  )
                  .map(this.displayComments)}{" "}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Issue;
