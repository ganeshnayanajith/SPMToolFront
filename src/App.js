import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './components/home';

function App() {
  return (
    <Router>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container">
            {/* <a className="navbar-brand" href="/"></a> */}
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              
            </div>
          </div>
        </nav>

        <Route path="/" exact component={Home} />
  

    </Router>
  );
}

export default App;
