import React from 'react'
import {Redirect,Link} from 'react-router-dom'

const Trophy = () => {
  
 const name=localStorage.getItem("name")
  const id=localStorage.getItem("id")
  
  const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
window.location.reload(false)
  }
  
  
if(localStorage.getItem("name")===null && localStorage.getItem("id")===null){
    return <Redirect to="/Login" />
  }
  else{
  return(
    <div>
 <nav id="bar">
<center>
<button onClick={logout} id="btn-2">log out</button>
</center>
  </nav>
    </div>
    )
  }
}

export default Trophy