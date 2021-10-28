import React from 'react'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom';
function LeftSideBar() {

    const history = useHistory();
    function toAddEditUserType() {
      history.push('/add-edit-user-type')
      
    }
    function toUserTypeList() {
      history.push('/user-type-list')
    }
    
    
    return(
      <div>
      {/* <div class="row"> */}
      <div style={{"margin-top" : 80}}>
    <ul class="list-group">
      
      <NavLink to ='add-edit-user-type' activeClassName='active' className="list-group-item">Add Edit User Type</NavLink>
      <NavLink to='user-type-list' activeClassName = 'active' className = "list-group-item">Users List</NavLink>
      
      </ul>
    </div>    
    </div>

    )
}
export default LeftSideBar