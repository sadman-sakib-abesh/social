import {React,useState} from 'react'

import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'


const Login=()=>{
  const [goodalert,setGood]=useState("")
  const [badalert,setAlert]=useState("")
 const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  
  const login=()=>{
    
  axios.post("http://localhost:3002/login",{email,password})
  .then(response=>{
    if(response.data.err){
      setAlert(response.data.err)
    }
    else if(response.data.good){
      setGood(response.data.good)
      setAlert("")
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("name",response.data.name)
      localStorage.setItem("email",response.data.email)
      
      
      setTimeout(function() {
        window.location.reload(false)
        
      }, 10);
    
  }
   
     
  })
  
  }
  
if(localStorage.getItem("name")===null && localStorage.getItem("id")===null){
  return(
    <div>

  <nav id="bar">

  </nav>
  <br /><br /><br />
  <br/>
  
  <center>
  <div id="form">
  <h3 id="sign">Log in</h3>
 <input id="in" type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br/><br/>
  
  <input id="in" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/><br/>
  
  
<button id="btn" onClick={login}>Log in</button><br/><br/><br/><br/><br /><br/>



 <span id="note">not registered? </span><Link to="/Signup" id="lnote">Sign up</Link><br/><br/>
  
<Link to="/Password" id="lnote">Forgot password?</Link><br /><br/><br/>
  </div>
 {goodalert?<h4 id="goodalert">{goodalert}</h4>:<h4></h4>}
  
{badalert?<h4 id="alert">{badalert}</h4>:<h4></h4>}
  
  
  </center>
  

    </div>
    )
  }
  else{
return <Redirect to="/" />
  }
    
  
}

export default Login