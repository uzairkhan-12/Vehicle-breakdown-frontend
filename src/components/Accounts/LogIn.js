import {useState} from 'react'
import { useHistory } from 'react-router-dom';
function LogIn(){
    const [Email , setEmail] = useState('')
    const [Password , setPassword] = useState('')
    const [isUserPresent , setUserPresent] = useState(false);
    const [ErrorMessage , setErrorMessage] = useState(false);
    const [isEmailError , setEmailError] = useState(false);
    const [isPasswordError  , setPasswordError] = useState(false);
    const history = useHistory();
    async function LoggingIn() {
      if(!checkEmailError() || !checkPasswordError()){
        return
      }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "EmailAddress": Email , "Password": Password })
        };
        
        let response = await fetch('https://localhost:5001/Account/log-in', requestOptions)
        
        if (response.ok) {
          let result = await response.json();
           if(result){
              //  setErrorMessage(false)
             ToHomePage()
           }
           else{
             setErrorMessage(true)
             console.log(result)
             return;
          }
        }
        // let data = await response.json();
        // console.log(data)
    }
    
      function checkPasswordError() {
        if(Password){
          setPasswordError(false)
          return true
        }
        else
        {
          setPasswordError(true)
          return false;
        }
      }
      function checkEmailError() {
        if(Email)
        {  
            setEmailError(false)
            return true;
          }
         else 
          {
            setEmailError(true)
            return false
          }
        }
      
      
    const onEmailChange = input => {
        setEmail(input.target.value)
    }
    const onPasswordChange = input => {
        setPassword(input.target.value)
    }

    const ToHomePage = () => {
      history.push('/home');
    }
  
    return(
        <div className="row col-md-9 offset-3">
         {/* <div className="row col-md-9"> */}
        <h2>Log In Form</h2>
        <form onSubmit={e=>e.preventDefault()}>
        <div className="form-group">
        <label>Email :</label><br />
        {isEmailError && <div className='alert alert-danger'>Email is required</div>}
        <input onChange={onEmailChange} type="email" className="form-control" placeholder="Email " aria-label="Email" />
      </div>
      <br />
      <div className="form-group">
        <label>Password :</label><br />
        {isPasswordError && <div className='alert alert-danger'>Password is required</div>}
        <input onChange={onPasswordChange} type="password" className="form-control" placeholder="Password " aria-label="Password" />
      </div>
      <br />
      {ErrorMessage && <div className='alert alert-danger'>Please Enter Correct Email or Password</div>}
      <button onClick={LoggingIn} className='btn btn-primary'>Log In</button>
      </form>
      </div>
    )
}
export default LogIn