import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"


const Account = ({user}) => (
  <div>
  {localStorage.getItem('user_key')}> <br></br>
  {localStorage.getItem('user_id')}
  {localStorage.getItem('user_name')}
    {/* <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
      <b>Username:</b> Joe Schmoe
    </Typography>
    <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
      <b>Email:</b> joeschmoe123@gmail.com
    </Typography>
    <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
      <b>Address:</b> 54321 Dummy Lane
    </Typography>
    <Typography variant="h6" align="left" style={{ marginLeft: 30 }}>
      <b>Date of Birth:</b> 2/20/2000
    </Typography>
    <Typography
      variant="h6"
      align="left"
      style={{ marginLeft: 30, marginBottom: 15 }}
    >
      <b>Political Affiliation:</b> Independent
    </Typography> */}

    <Button
      variant="contained"
      color="secondary"
      style={{
        textTransform: "none",
        fontWeight: "bold",
        backgroundColor: "red"
      }}
    >
      Edit profile
    </Button>
  </div>
)

export default Account
