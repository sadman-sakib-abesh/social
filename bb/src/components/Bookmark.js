import React from 'react'
import {Redirect,Link} from 'react-router-dom'


const Bookmark=()=>{
  
const name=localStorage.getItem("name")
  const id=localStorage.getItem("id")
  const mail=localStorage.getItem("email")
  
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
    
    </div>
    )
  }
  
  
  
}


export default Bookmark