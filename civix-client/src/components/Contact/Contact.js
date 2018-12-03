import React from "react"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
  Container
} from "reactstrap"

import "./Contact.css"

import axios from "axios"
import { IoMdCall, IoIosMail } from "react-icons/io"
import NavigationBar from "../NavigationBar/NavigationBar"

class ContactCard extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ width: 260 }}>
          <CardImg
            top
            width="80%"
            height="270vw"
            src={this.props.photolink}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>{this.props.position}</CardSubtitle>
            <CardText>{this.props.party}</CardText>
            <ButtonGroup />
            <ButtonGroup className="btn-group" role="group">
              <Button
                className="btn, btn-primary"
                style={{ backgroundColor: "rgb(39, 160, 248)", border: "none" }}
              >
                <a href={this.props.phonelink} style={{ color: "#ffffff" }}>
                  <IoMdCall/> Call
                </a>
              </Button>
              <Button
                className="btn, btn-primary"
                type="button"
                style={{ backgroundColor: "#E85a4f", border: "none" }}
              >
                <a href= { this.props.emaillink} style={{ color: "#ffffff" }}>
                  <IoIosMail/> Email
                </a>
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    )
  }
}

class Contact extends React.Component {
  //Constructor
  constructor(props) {
    super(props)
    this.getRepresentatives = this.getRepresentatives.bind(this)
    this.displayRepresentatives = this.displayRepresentatives.bind(this)
    this.state = {
      representatives: [],
      positions: []
    }
  }

  //Representative display function
  //Takes the representative per event and index
  displayRepresentatives(representative, i) {
    var name = representative.name
    //alert(JSON.stringify(this.state.positions))
    //alert(JSON.stringify(this.state.representatives))
    //alert("at index " + i)
    var position = representative.office
    var party = representative.party
    var phonelink = "tel:" + representative.phones[0]
    var url = representative.urls ? representative.urls[0] : null
    var emaillink = url
    if (representative.emails !== undefined) {
      console.log("email exists for this rep")
      emaillink = "mailto:" + representative.emails[0] 
    }
    var photolink =
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
    if (representative.photoUrl !== undefined) {
      console.log("photo url exists for this rep")
      photolink = representative.photoUrl
    }

    return (
      <ContactCard
        name={name}
        position={position}
        party={party}
        phonelink={phonelink}
        emaillink={emaillink}
        photolink={photolink}
        key={i}
        index={i}
      />
    )
  }

  getRepresentatives() {
    //replace later
    //localStorage.getItem("user_id")
    var profileurl = "http://localhost:8000/profiles/" + localStorage.getItem("user_id")
    var address = ""
    var self = this

    axios
      .get(profileurl)
      .then(function(response) {
        console.log("Successfully retrieved profile information for user " + localStorage.getItem("user_id"))
        var streetAddress = response.data.streetAddress
        var city = response.data.city
        var state = response.data.state
        var zipcode = response.data.zipcode
        address =
          encodeURIComponent(streetAddress) +
          "%20" +
          city +
          "%20" +
          state +
          "%20" +
          zipcode
      })
      .then(function() {
        var googleurl =
          "https://www.googleapis.com/civicinfo/v2/representatives/?key=AIzaSyDEzZwmzrNCj_upcYhgWfWqYP_6iMqTG1c&address=" +
          address +
          "&levels=administrativeArea1"
        //Attempt concurrent profile creation
        axios.get(googleurl).then(function(response) {
          console.log(
            "Successfully retrieved representative information for address " +
              address
          )

          var reps = response.data.officials
          var offices = response.data.offices
          var index = 0
          reps.forEach(function(representative) {
            representative["office"] = offices[index].name
            index = index + 1
          })
          //alert(JSON.stringify(reps))
          console.log(JSON.stringify(response.data.officials))
          console.log(JSON.stringify(response.data.offices))
          self.setState({
            representatives: reps
          })
        })
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
    this.getRepresentatives()
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div style={{ verticalAlign: "middle" }}>
          <Container className="card-container">
            {this.state.representatives.map(this.displayRepresentatives)}
          </Container>
        </div>
      </div>
    )
  }
}

export default Contact
