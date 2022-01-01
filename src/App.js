import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import main from './main'
// import { Routes } from 'react-router';

function App() {
  return (
    <Router>
      
      <Route exact path="/" component={main} />
  


    </Router>
  );


}

export default App;
