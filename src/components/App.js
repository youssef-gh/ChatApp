import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login' ;

// import { AuthProvider } from "../contexts/AuthContext"

// import Chats from "./Chats"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
          <Switch>  
            <Route path="/" component={Login} />
          </Switch>
      </Router>
    </div>
  )
}

export default App
