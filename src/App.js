import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './main'
import Anim from "./Anim";
// import { Routes } from 'react-router';

function App() {
  return (

      <BrowserRouter>
          <Routes>
        <Route exact path={"/"} element={<Main/>} />
        <Route path={"/cycle"} element={<Anim/>}/>
        </Routes>
      </BrowserRouter>
  );


}

export default App;
