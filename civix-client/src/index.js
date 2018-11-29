import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App/App"
import * as serviceWorker from "./serviceWorker"

//Bootstrap CSS 
import "bootstrap/dist/css/bootstrap.min.css"
//Global storage file
import "./global.js"
//React Router
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
                <Router>
                <App />
                </Router>,
                document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn 9mkikjumore about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
