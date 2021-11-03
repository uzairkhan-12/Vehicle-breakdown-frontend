import { useEffect, useState } from 'react'
//import {BrowserRouter as Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { Redirect } from 'react-router'
import { NavItem } from 'react-bootstrap';

function SignUp() {
  const [name, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState() // user have the id of user type
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isEmailExist, setEmailExist] = useState(false)
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUsersError, setUsersError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isConfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [globalMessage, setGlobalMessage] = useState(false)
  const [acitveUsers , setActiveUsers] = useState([''])
  const history = useHistory();

  async function submitData() {
    if (!handleNameValidation()) {
      return;
    }
    if(!email){
      setIsEmailError(true)
      return;
    }
    if(handleEmailValidation()){
      return;
    }
    if (isEmailExist) { 
      return
    }
    if(isEmailValid){
      return;
    }
    if (!handelUsersValidation()) {
      return;
    }
    if (!handlePasswordValidation()) {
      return;
    }
    if(!handleConfirmPasswordValidation()){
      return;
    }
    if(!PasswordConfirmation()){
      return
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "Name": name, "Email": email, "Password": password, "UserType" : parseInt(user)})
    }
    let response = await fetch('https://localhost:5001/Account/add', requestOptions);
    if (response.ok) {
      let result = await response.json();
      console.log(result)
      setGlobalMessage(false)
      ToLogInForm()
    }
    if(response.status !==200){
      setGlobalMessage(true)
      return
    }
    // else {
    //   console.log('someting went wrong')
    //   setGlobalMessage(true)
    // }
  }
  //requestOptions ka matlab ye ha k jo data men post krny ja rha hn unki type json ha
  async function EmailChecking() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "EmailAddress": email })
    };
    let response = await fetch('https://localhost:5001/Account/is-email-exist', requestOptions)

    if (response.ok) {
      let result = await response.json();
      console.log(result)
      setEmailExist(result)
    }
  }
useEffect(() => {
  getActiveUsers()
},[])
  
  async function getActiveUsers() {
  
    let response = await fetch('https://localhost:5001/usertype-controller/get-active-users')
    .then(response => response.json())
    .then(data => setActiveUsers(data));
     console.log(acitveUsers) 
  }

  

  const onFirstNameChange = input => {
    setIsNameError(false)
    setFirstName(input.target.value)
  }


  const onEmailChange = input => {
    setEmail(input.target.value)
     setIsEmailError(false);
     setEmailValid(false)
  }

  const onUserChange = input => {
    setUsersError(false)
    setUser(input.target.value)
  }

  const onPasswordChange = input => {
    setPasswordError(false)
    setPassword(input.target.value)
  }
  const onconfirmPasswordChange = input => {
    setconfirmPassword(input.target.value)
  }

  const handleNameValidation = () => {
    if (name) {
      setIsNameError(false)
      return true;
    } else {
      setIsNameError(true)
      return false;
    }
  }

  const handleEmailValidation = () => {
    if (email) {
      setIsEmailError(false)

    } else {
      setIsEmailError(true)

    }
  }

  const handelUsersValidation = () => {
    if (user && user !='default') {
      setUsersError(false)
    console.log('if is calling')
    return true
    }
    else {
      setUsersError(true)
      console.log('else is calling')
    return false
    }
  }

  const handlePasswordValidation = () => {
    if (password) {
      setPasswordError(false)
      return true;
    } else {
      setPasswordError(true)
      return false;
    }
  }

  const handleConfirmPasswordValidation = () => {
    console.log('working')
    if (confirmPassword !== password) {
      setConfirmPasswordError(true)
      return false;
    }
    else {
      setConfirmPasswordError(false)
      return true
    }
  }

  function PasswordConfirmation() {
    if (confirmPassword === password) {
      return true;
    }
  }


  function checkEmailValid() {
    if (validator.isEmail(email)) {
      setEmailValid(false)
      EmailChecking()
    }
    else {
      setEmailValid(true)
      EmailChecking()
    }
  }


  const ToLogInForm = () => {
    history.push('/log-in');
  }
  
  return (

    <div className="row col-md-9 offset-3">
        <h2>Sign Up Form</h2>
        <form>
          <div className="form-group">



            <label>Name :</label><br />
            {isNameError && <div className='alert alert-danger'>Name is required</div>}
            <input onChange={onFirstNameChange} type="text" className="form-control" placeholder="Name" aria-label="Username" />
          </div>
          <br />
          <div className="form-group">
            <label>Email :</label><br />
            {isEmailError && <div className='alert alert-danger'>Email is required</div>}
            {isEmailExist && <div className='alert alert-danger'>Email already Exist</div>}
            {isEmailValid && <div className='alert alert-danger'>Please Enter the valid Email</div>}
            <input onChange={onEmailChange} onBlur={checkEmailValid} type="email" className="form-control" placeholder="Email " aria-label="Email" />
          </div>
          <br />
          <div className="form-group">
            <label>Sign up as :</label>
            {/* <select className="form-control" onChange={onUserChange}>
      <option value="default">Choose...</option>
      <option value="owner">Vehicle Owner</option>
      <option value="mechanic">Mechanic</option>
    </select> */}
              {isUsersError && <div className="alert alert-danger">Please Select One </div>}
            <select className="form-control" onChange={onUserChange}>
              <option value="default">Choose...</option>
              {acitveUsers.map((item) => <option key={item.id} value={item.id}>{item.userTypeName}</option>
              )}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Password :</label><br />
            {isPasswordError && <div className="alert alert-danger">Password is required</div>}
            <input onChange={onPasswordChange} type="password" className="form-control" placeholder="Password" aria-label="password" />
          </div>
          <br />
          <div className="form-group">
            <label>Confirm Password :</label><br />
            {isConfirmPasswordError && <div className="alert alert-danger">Password does not match</div>}
            <input onKeyUp={handleConfirmPasswordValidation} onChange={onconfirmPasswordChange} type="password" className="form-control" placeholder="Confirm Password" aria-label="password" />
          </div>
          <br />
          {globalMessage && <div className="alert alert-danger">Something went wrong please try again later</div>}
          <button onClick={submitData} type="button" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
  );
}
export default SignUp