import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import red from "@material-ui/core/colors/red"
import CallIcon from "@material-ui/icons/Call"
import EmailIcon from "@material-ui/icons/Email"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"

import ericgarcetti from "./images/eric-garcetti.jpg"
import mikefeuer from "./images/mike-feuer.jpg"
import rongalperin from "./images/ron-galperin.jpg"

const styles = theme => ({
  card: {
    width: 250,
    height: 420
  },
  media: {
    height: 200,
    borderRadius: 100,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    transform: "scale(0.9)"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
})

class ContactCard extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={this.props.cardPicture} />
        <CardHeader
          title={this.props.cardName}
          subheader={this.props.cardPosition}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <a href={this.props.phoneLink}>
            <IconButton aria-label="Call">
              <CallIcon color="secondary" />
            </IconButton>
          </a>
          <a href={this.props.emailLink}>
            <IconButton aria-label="Send e-mail">
              <EmailIcon color="primary" />
            </IconButton>
          </a>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>{this.props.cardDescription}</CardContent>
        </Collapse>
      </Card>
    )
  }
}

ContactCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const ContactCardWrapped = withStyles(styles)(ContactCard)

const contactListStyles = {
  display: "flex",
  flexDirection: "row",
  padding: 0
}

//Scrollable list of events
class ContactList extends React.Component {
  render() {
    return (
      <div>
        <Paper style={{ overflow: "auto" }}>
          <List style={contactListStyles}>
            <ListItem>
              <ContactCardWrapped
                cardName="Eric Garcetti"
                cardPosition="Mayor"
                cardPicture={ericgarcetti}
                phoneLink="tel:213-978-1028"
                emailLink="mailto:mayor.helpdesk@lacity.org"
                cardDescription={
                  <div>
                    <p>
                      Eric Garcetti is a fourth-generation Angeleno and the 42nd
                      Mayor of Los Angeles. Born and raised in the San Fernando
                      Valley — the son of public servants and the grandson and
                      great-grandson of immigrants from Mexico and Eastern
                      Europe — Mayor Garcetti’s life has been shaped by a deep
                      commitment to the core values of justice, dignity, and
                      equality for all people.
                    </p>
                    <p>
                      These ideals have fueled the Mayor’s relentless drive to
                      fulfill our common obligation: to give children and
                      families of every race, faith, background, and income the
                      chance to get a good education, live on safe streets, earn
                      a decent wage, breathe clean air and drink clean water,
                      receive affordable medical and child care, and build a
                      future of their own choosing.
                    </p>
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ContactCardWrapped
                cardName="Mike Feuer"
                cardPosition="City Attorney"
                cardPicture={mikefeuer}
                phoneLink="tel:213-978-8100"
                emailLink="mailto:lacityatty@lacity.org"
                cardDescription={
                  <div>
                    <p>
                      Los Angeles City Attorney Mike Feuer has long been one of
                      California's leading lawyers and lawmakers. As L.A.’s
                      chief lawyer and prosecutor since July, 2013, he has
                      brought an innovative, problem-solving focus that combines
                      tough and effective prosecution with initiatives to
                      improve public safety and the quality of life throughout
                      the city. Feuer’s office also has been at the forefront of
                      key national issues ranging from gun violence prevention
                      and consumer protection to justice system reform and
                      challenges to recent federal policies that threaten
                      fundamental rights and public safety. Feuer was re-elected
                      in March, 2017, to a second term without opposition. In
                      2017, the American Bar Association presented its top award
                      in the nation for a public sector law office to Feuer’s
                      office—the first City Attorney’s office ever to receive
                      the distinguished Hodson Award, recognizing “sustained,
                      outstanding performance or a specific and extraordinary
                      service by a government or public sector law office."
                    </p>
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ContactCardWrapped
                cardName="Ron Galperin"
                cardPosition="City Controller"
                cardPicture={rongalperin}
                phoneLink="tel:213 978-7200"
                emailLink="mailto:controller.galperin@lacity.org"
                cardDescription={
                  <div>
                    <p>
                      ​Ron Galperin serves as Controller of the City of Los
                      Angeles ­­ working as the watchdog for L.A.'s taxpayers.
                      Controller Galperin oversees a team conducting independent
                      audits, managing the City's payroll and disbursements,
                      preparing reports on the City’s finances, pursuing waste
                      and fraud, and creating a more transparent and accountable
                      city. He was first elected in 2013 and re-elected in 2017.
                    </p>
                    <p>
                      Prior to his being elected as Controller, Galperin built a
                      reputation as a leading voice for government reform – and
                      he is the first Neighborhood Council member elected to
                      city­wide office in Los Angeles. Controller Galperin has
                      also long promoted cutting waste and developing programs
                      to help businesses create jobs. As Chair of the Los
                      Angeles Commission on Revenue Efficiency, he worked to
                      develop new revenue sources and budget savings to deliver
                      more services to residents and businesses. He also served
                      as President of the City's Quality & Productivity
                      Commission.
                    </p>
                    <p>
                      Galperin has had more than twenty years of experience as
                      an attorney and business owner. He earned his J.D. from
                      Loyola Law School in Los Angeles and his undergraduate
                      degree from Washington University in St. Louis. Galperin
                      is the son of immigrant parents and lives in Los Angeles
                      with his husband, Rabbi Zachary Shapiro.
                    </p>
                  </div>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </div>
    )
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ContactList)
