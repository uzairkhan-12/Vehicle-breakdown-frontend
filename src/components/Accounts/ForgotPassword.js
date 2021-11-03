import { useState } from "react"
import validator from "validator";

function ForgotPassword(){
    const [email , setEmail] = useState('')
    const [isEmailError , setEmailError] = useState(false);
    const [isEmailValid, setEmailValid] = useState(false);
    const [errorMessage , setErrorMessage] = useState(false);
    const [emailSentMessage ,setEmailSentMessage] = useState(false)
    const onEmailChange = input => {
        setEmail(input.target.value);
        setEmailError(false)
        setEmailValid(false)
        setErrorMessage(false)
        setEmailSentMessage(false)
    }
    async function submitData() {
        if(!email){
            setEmailError(true);
            return;
        }
        if(!validator.isEmail(email))
        {
            setEmailValid(true)
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "EmailAddress": email })
          };
          
          let response = await fetch('https://localhost:5001/Account/forgot-password', requestOptions)
          
          let result = await response.json();
          if(result == true){
              //console.log('email sent')
            setEmailSentMessage(true)
            
            }
          else{
              setErrorMessage(true);
          }
        
          }
  

    return(
        <div className="row col-md-9 offset-3">
        <form>
        <div className="form-group">
        <h2>Forgot Password</h2>
        <br />
        <label>Email :</label><br />
        {isEmailError && <div className='alert alert-danger'>Email is required</div>}
        {isEmailValid && <div className='alert alert-danger'>Please Enter the valid email</div>}
        {errorMessage && <div className='alert alert-danger'>Email not found</div>}
        {emailSentMessage && <div className='alert alert-dark'>Email Sent Successfully please Varify your email address in Gmail</div>}
        <input onChange={onEmailChange} type="email" className="form-control" placeholder="Email " aria-label="Email" />
        </div>
        <div>
        <br />
        <button onClick={submitData} type="button" className="btn btn-primary">Submit</button>
        </div>
        </form>
        </div>
    )
}
export default ForgotPassword