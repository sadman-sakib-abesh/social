import {React,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import passwordHash from 'password-hash'
const Signup = () => {
  const[goodalert,setGood]=useState("")
  const [badalert,setAlert]=useState("")
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [reset,setReset]=useState("");
  const follower=[]
  const following=[]
  const bio=""
  const fb=""
  const li=""
  const tw=""
  
  const Hash=passwordHash.generate(password)
  
  
 const signup=()=>{
  if(password===reset){
    if(password.length>=8){
      if(name==="" && email===""){
      setAlert("**name and email can't be empty")
    }
      else{
    axios.post("http://localhost:3002/sign",{name,email,Hash,follower,following,bio,fb,li,tw})
    .then(response=>{
  if(response.data.err){
    setAlert(response.data.err)
  }
  
  else{
    setGood(response.data)
    setAlert("")
    setName("")
    setPassword("")
    setReset("")
  }
    
    })
    
    
      }
    
    }
    
    else{
      setAlert("**password should contain more then 8 charechters ")
    }
  }
  else{
    setAlert("**password doesn't match")
  }
  
 }
  
  
  if(goodalert==="successfully signed up"){
    return <Redirect to="/Login"/>
  }
  
  else{
  return(
    <div>
    <nav id="bar"></nav>
  
  <br/>
  <br/>
  <br/>
  
  <center>
  <div id="form">
  <h3 id="sign">sign up</h3>
  <input id="in" type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/><br/><br/><br/>
  
  <input id="in" type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br/><br/>
  
  <input id="in" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
<br/>
  <input id="in" type="password" placeholder="confirm password" onChange={(e)=>setReset(e.target.value)}/><br/><br/>
  
  <button id="btn" onClick={signup}>Sign up</button><br/><br/>
 <span id="note">already have an account? </span><Link to="/Login" id="lnote">Log in</Link><br/><br/>
  
  </div>

 {goodalert?<h4 id="goodalert">{goodalert}</h4>:<h4></h4>}
  
{badalert?<h4 id="alert">{badalert}</h4>:<h4></h4>}
  </center>
  <br/>

  
    </div>
    )
}
}
export default Signup