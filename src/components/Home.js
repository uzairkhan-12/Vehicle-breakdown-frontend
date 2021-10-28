import React from 'react'
// import LeftSideBar from './LeftSideBar';
import PlaceHolder from './PlaceHolder';
import TitleBar from '../titleBar';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';

function Home(props) {

  console.log(props.location.pathname)
  return (
  null
    // <>
    //   <div className="row">
    //     <TitleBar />
    //   </div>
    //   <div className="row">
    //     {/* <div className="col-md-3"><LeftSideBar /></div> */}
    //     <div className="col-md-9" style={{"margin-top" : 60}}>
    //     < PlaceHolder />    
    //     </div>
    //   </div>
    // </>
  )
}
export default withRouter(Home)