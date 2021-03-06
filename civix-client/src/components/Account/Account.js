import React from "react";
import Typography from "@material-ui/core/Typography";
import NavigationBar from "../NavigationBar/NavigationBar";

//axios for HTTP requests
import axios from "axios";

/**
 * Represents the account  page.
 * @param {Object} props - React props
 */
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.state = {
      userInfo: {}
    };
  }

  /**
   * React function that calls setup functions when the component is first mounted. We need to get the user information to be displayed.
   */
  componentDidMount() {
    this.getUserInfo();
  }

  /**
   * Retrieves user information using axios.
   */
  getUserInfo() {
    //Build URL
    var url =
      "http://localhost:8000/profiles/" + localStorage.getItem("user_id");

    //Request and store profile information
    axios
      .get(url)
      .then(response => {
        const userInfo = response.data;
        console.log(
          "Successfully retrieved profile information " + response.data
        );
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
  /**
   * Renders the profile component
   * @return {ReactComponent} - Account component to display as profile
   */
  render() {
    return (
      <div>
        <NavigationBar />
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Username:</b> {localStorage.getItem("user_name")}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Address:</b>{" "}
          {this.state.userInfo.streetAddress +
            ", " +
            this.state.userInfo.city +
            ", " +
            this.state.userInfo.state +
            ", " +
            this.state.userInfo.zipcode}
        </Typography>
        <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
          <b>Date of Birth:</b> {this.state.userInfo.dob}
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
