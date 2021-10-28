import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';



function UserTypeList() {
  const [userType, setUserType] = useState(['']);
  
  const history = useHistory();

  var serialNo = 0;
  function LoadData() {
     fetch("https://localhost:5001/usertype-controller/get-user-type")
      .then(response => response.json())
      .then(data => setUserType(data))
  }

  const editData=(userTypeId)=> {
    
    history.push('edit-user-type/' + userTypeId)
    console.log('edit button is working with id', userTypeId)
  }
  const addData=() => {
    history.push('add-edit-user-type')
  }

  // function deleteData(id){
  // fetch('https://localhost:5001/usertype-controller/delete?userId='+id)
  // .then(() => setStatus('delete successful'))
  // //.then(response => response.json())
  // //.then(data => setUserType(data))
  // }

  async function deleteData(id) {
    const response = await fetch('https://localhost:5001/usertype-controller/delete?userId=' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    });
    const data = await response.json();
    // now do whatever you want with the data  
    console.log(data);
    LoadData()
  };

  useEffect(() => {
    LoadData();
  }, [])


  async function toggle(userId) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "Id": userId })
    }
    let response = await fetch('https://localhost:5001/usertype-controller/data-toggle', requestOptions);
    if (response.ok) {
       await response.json();
      LoadData()
    }
    else {
      console.log('error')
    }
  }
  
  return (
    // <div className='row col-md-6 offset-3'>
      <div>
      <form onSubmit={e => e.preventDefault()}>
      <button style={{float:'right'}} onClick={addData} type="button" className = " btn btn-primary">Add User Type</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S No</th>
              <th scope="col">User Type</th>
              <th scope="col"> Acitve / inActive  </th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userType.map((item =>
              <tr key={item.id}>
                <td>{serialNo = serialNo + 1}</td>
                <td>{item.userTypeName}
                  <br />
                  {item.isActive ? "Yes" : "No"}
                </td>
                <td><button onClick={() => { toggle(item.id) }} type="button" className="btn btn-outline-primary">Toggle</button></td>
                <td><button onClick={() => { editData(item.id) }} className="btn btn-primary">Edit</button></td>
                {/* <td><button onClick={ () => {deleteData(item.id)} } className="btn btn-danger">Delete</button></td> */}
                <td><button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteData(item.id) }}>Delete</button></td>
              </tr>
            ))}
            {/* <tr>
      <th scope="row"></th>
      <td></td>
      <td><button className='btn btn-primary'>Edit</button></td>
      <td><button className='btn btn-danger'>Delete</button></td>
    </tr> */}
          </tbody>
        </table>
      </form>
    </div>
  )
}
export default UserTypeList;