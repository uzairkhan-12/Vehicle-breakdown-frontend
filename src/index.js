import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Placeholder  from './components/PlaceHolder';
import Home from './components/Home'
import { BrowserRouter as Router,Switch } from 'react-router-dom'
import TitleBar from '../src/titleBar';
import PlaceHolder from '../src/components/PlaceHolder';



ReactDOM.render(
  <React.StrictMode>
    <Router>
    <div key="1" className="row">
        <TitleBar />
      </div>
      <Switch>
      <div key="2"  className="row">
        {/* <div className="col-md-3"><LeftSideBar /></div> */}
        <div className="col-md-9" style={{marginTop : 60}}>
        < PlaceHolder />    
        </div>
      </div>
    
    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
