import React, { Component } from 'react'
import './IssuesBoard.css'

const candidates2018 = [
  {office: "California Governor", candidates: [{name: "Gavin Newsom", party: "Democratic"}, {name: "John Cox", party: "Republican"}]},
  {office: "California Lieutentant Governor", candidates: [{name: "Eleni Kounalakis", party: "Democratic"}, {name: "Ed Hernandez", party: "Democratic"}]},
  {office: "House of Represententatives, CA-45", candidates: [{name: "Mimi Walters", party: "Republican"}, {name: "Katie Porter", party: "Democratic"}]}
]

const IssuePanel = ({issue: {office, candidates}}) => (
  <div className="IssuePanel">
    <h1>{office}</h1>
    <h2>{candidates[0].name} vs {candidates[1].name}</h2>
  </div>

)

export default class IssuesBoard extends Component {
  render() {
    return (
      <div>
        <h1>Midterm Election 11/6/2018</h1>
        <h2>Candidates</h2>
        {candidates2018.map((el,i) => <IssuePanel key={i} issue={el}/>)}
        <h2>Propositions</h2>
      </div>
    )
  }
}