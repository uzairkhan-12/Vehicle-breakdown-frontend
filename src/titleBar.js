import React from 'react'
// import { useHistory } from 'react-router'
import LogIn from './components/Accounts/LogIn';
import SignUp from './components/Accounts/SignUp';
import { Link, NavLink } from 'react-router-dom';

function TitleBar() {
  // const history = useHistory();
  // function toLogIn() {
  //   history.push('/log-in');
  // }
  // function toSignUp() {
  //   history.push('/sign-up')
  // }

  const routes = {
    "/log-in": () => <LogIn />,
    "/sign-up": () => <SignUp />
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light fixed-top">
      

      <NavLink to="/log-in" style={{ marginLeft :1270 }} className="btn btn-outline-success">Log in</NavLink>
      <NavLink to="/sign-up" style={{ marginLeft: 10 }} className="btn btn-outline-success">Sign Up</NavLink>


    </nav>)
}
export default TitleBar
