import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './main'
import Anim from "./Anim";
// import { Routes } from 'react-router';

function App() {
  return (

    <Router>
        <Route exact path="/" component={Main} />
        <Route path="/cycle" component={Anim}/>
    </Router>
  );


}

export default App;
