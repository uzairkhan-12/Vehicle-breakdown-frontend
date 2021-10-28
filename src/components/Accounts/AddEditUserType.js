import React, { useState , useEffect } from 'react'
import {  useParams , useHistory } from 'react-router-dom';

function AddEditUserType() {

    const [userType, setUserType] = useState('')
    const [isUserActive, setUserActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    //const [userTypeNameById , setUserTypeNameById] = useState('')
    //const [editedUserType , setEditedUserType] = useState('')
    const [userTypeError , setUserTypeError] = useState(false)
   const history = useHistory()
    let { id } = useParams();
    //let {userTypeNameById} = useParams();
    
    
    async function submitData(params) {
        if (!handleUserTypeValidation()) {
            setErrorMessage(true)
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "UserTypeName": userType, "IsActive": isUserActive })
        }
        let response = await fetch('https://localhost:5001/usertype-controller/add-user-type', requestOptions);
        if(!response.ok){
            setUserTypeError(true)
        }
        if (response.ok) {
            let result = await response.json();
            ToUserTypeList()
        }
    }
        useEffect(async() => {
            if(id != null){
            let  response = await fetch('https://localhost:5001/usertype-controller/get-row-by-id?selectedUserId=' + id)
            if(response.ok){
                let result = await response.json();
                //setEditedUserType(result)
                setUserType(result.userTypeName)
            }
        }
    }, [])
    
      
        
        // .then(data => setEditedUserType(data.IsActive))
        //ype "+editedUserType);
      

    async function addEditedData() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Id" : parseInt(id) , "UserTypeName": userType, "IsActive": isUserActive })
        }
        let response = await fetch('https://localhost:5001/usertype-controller/update', requestOptions);
        if (response.ok) {
            let result = await response.json();
            console.log(result);
            ToUserTypeList()
        }
        else {
            setUserTypeError(true)
        }
        
    }

    const onUserTypeChange = input => {
        setErrorMessage(false)
        setUserType(input.target.value);
        setUserTypeError(false)
    }
    const onUserActiveChange = () => {
        setUserActive(!isUserActive);
    }

    function handleUserTypeValidation() {
        if (userType) {
            return true
        }
        else {
            return false
        }
    }


    const ToUserTypeList = () => {
        history.push('/user-type-list');
    }

    
    return (
        // <div className="row col-md-6 offset-3">
            <div>
            <h2>Add Edit User Type</h2>
            <br />
            <br />
            <form onSubmit={e => e.preventDefault()}>



                <div className="form-group">
                    <label>User type</label>
                    {errorMessage && <div className="alert alert-danger">User Type is required</div>}
                {userTypeError && <div className = "alert alert-danger">User Type already Exist</div>}
                    <input onChange={onUserTypeChange} type="text" className="form-control"  value = {userType} placeholder= 'Mechanic etc' aria-label="User type" />
                    <br />
                </div>
                <div className="form-group">
                    <input onChange={onUserActiveChange} type="checkbox" name="vehicleType" />Is Active
                </div>
                <br />
                <button onClick={id==null ? submitData : addEditedData} className="btn btn-primary">Submit</button>
            </form>
        </div>
        
    )
}
export default AddEditUserType;