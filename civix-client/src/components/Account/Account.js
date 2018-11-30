import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NavigationBar from "../NavigationBar/NavigationBar"

import axios from "axios";

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.state = {
      userInfo: {}
    };
  }

  componentDidMount() {
    this.getUserInfo()
  }
  
  getUserInfo() {
    //Setup
    var url = "http://localhost:8000/profiles/" + localStorage.getItem("user_id");
    axios
      .get(url)
      .then(response => {
        const userInfo = response.data;
        console.log(response.data)
        this.setState({ userInfo });
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
  render() {
    return (
      <div>
        <NavigationBar/>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Username:</b> {localStorage.getItem("user_name")}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Address:</b> {this.state.userInfo.streetAddress}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Date of Birth:</b> {this.state.userInfo.dob}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>City:</b> {this.state.userInfo.city}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>State:</b> {this.state.userInfo.state}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Zipcode:</b> {this.state.userInfo.zipcode}
        </Typography>
        <Typography
          variant="h6"
          align="left"
          style={{ marginLeft: 30, marginBottom: 15 }}
        >
          <b>Political Affiliation:</b> {this.state.userInfo.poliID}
        </Typography>
      </div>
    );
  }
}
export default Account;
