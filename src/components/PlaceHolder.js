import React from 'react'
import SignUp from './Accounts/SignUp';
import LogIn from './Accounts/LogIn'
import ForgotPassword from './Accounts/ForgotPassword'
import AddEditUserType from "./Accounts/AddEditUserType"
import UserTypeList from './Accounts/UserTypeList'
// import Home from './Home'
import { BrowserRouter as Switch, Route, withRouter } from 'react-router-dom'

import LeftSideBar from './LeftSideBar';

function PlaceHolder() {

  return (
    <>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/log-in">
        <LogIn />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/user-type-list">
        <div className="row">
          <div className="col-md-4"><LeftSideBar /></div>
          <div className="col-md-8"><UserTypeList /></div>
        </div>
      </Route>
      <Route path="/add-edit-user-type">
        <div className="row">
          <div className="col-md-4"><LeftSideBar /></div>
          <div className="col-md-8"><AddEditUserType /></div>
        </div>


      </Route>
      <Route path="/edit-user-type/:id">
        <div className="row">
          <div className="col-md-4"><LeftSideBar /></div>
          <div className="col-md-8"><AddEditUserType /></div>
        </div>
      </Route>
      <Route exact path="/">
        <SignUp />
      </Route>

    </>

  )
}

export default withRouter(PlaceHolder)