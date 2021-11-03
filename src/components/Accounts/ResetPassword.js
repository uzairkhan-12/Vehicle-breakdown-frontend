import React, { useState } from 'react'
import { useParams } from 'react-router'

function ResetPassword(){
    const [password , setPassword] = useState('');
    const [passwordAgain , setPasswordAgain] = useState('')
    const [passwordError , setPasswordError] = useState(false);
    const [passwordAgainError , setPasswordAgainError] = useState(false);
    const [passwordMatchingError , setPasswordMatchingError] = useState(false)
    const [passwordChanged , setPasswordChanged] = useState(false);
    const [passwordChangeError , setPasswordChangeError] = useState(false);
    let {key} = useParams();
    // console.log(key)


    async function submit() {
        if(!password){
            setPasswordError(true)
            return
        }
        if(!passwordAgain){
            setPasswordAgainError(true)
            return
        }
        {
            if(password != passwordAgain){
                setPasswordMatchingError(true);
                return;
            }
        }
     const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "newPassword" : password, "key" : key })
    }
    let response = await fetch('https://localhost:5001/Account/update-password', requestOptions);
    if (response.ok) {
        let result = await response.json();
        if(result == true)
        {
        setPasswordChanged(true);
        console.log(result);
    }
        else{
            console.log(result);
            setPasswordChangeError(true)
        }
        //ToUserTypeList()
    }
    else{
        
    }
    
    

    }


    const onPasswordChange = input => {
        setPassword(input.target.value)
        setPasswordError(false)
        setPasswordMatchingError(false)
        setPasswordChangeError(false)
    }
    const onPasswordAgainChange = input => {
        setPasswordAgain(input.target.value);
        setPasswordAgainError(false)
        setPasswordMatchingError(false)
        setPasswordChangeError(false)
    }


    return(
        <div className = "col-md-9 offset-3">
        <form onSubmit={e=>e.preventDefault()}>
            <div className="form-group">
        <label>New Password :</label><br />
        {passwordError && <div className='alert alert-danger'>Password is required</div>}
        <input onChange={onPasswordChange} type="password" className="form-control" placeholder="New Password " aria-label="password" />
      </div>
      <br />
      <div className="form-group">
        <label>Confirm New Password :</label><br />
      {passwordMatchingError && <div className = 'alert alert-danger'>Password Does not match</div>}
        {passwordAgainError && <div className='alert alert-danger'>Confirm Password is required</div>}
        <input onChange={onPasswordAgainChange} type="password" className="form-control" placeholder="Re-Enter New Password " aria-label="password" />
      </div>
      <br />
      <div>
      {passwordChanged && <div className='alert alert-info'>Password Changed Successfully</div>}
      {passwordChangeError && <div className='alert alert-danger'>Something went wrong please try again later</div>}
          <button onClick={submit} className="btn btn-primary">Reset</button>
      </div>
        </form>
        </div>
    )
}
export default ResetPassword