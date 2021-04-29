import {React,useState} from 'react'

import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import passwordHash from 'password-hash'

const Password=()=>{
  const [goodalert,setGood]=useState("")
  const [badalert,setBad]=useState("")
  const [otp,setOtp]=useState("")
 const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [reset,setReset]=useState("")
  const Hash=passwordHash.generate(password)
  
  const[send1,set1]=useState("")
  const[send2,set2]=useState("")
  
  
  const send=()=>{
    
  axios.post("http://localhost:3002/otp",{email,"send":"true"})
  .then(response=>{
    if(response.data.err){
      setBad(response.data.err)
    }
    else{
      setGood(response.data)
      setBad("")
      set1("wholesome")
      set2("wholesome")
    }
  
  })
  
  }
  
  
  
  
  const sendOtp=()=>{
    
  axios.post("http://localhost:3002/otp",{otp,send:"false"})
  .then(response=>{
    
if(response.data.err){
      setBad(response.data.err)
    }
    else{
      setGood(response.data)
      setBad("")
      set2("")
    
    }
  })
  
  }
  
  
  
  
  const newPass=()=>{
    if(password===reset){
      if(password.length>=8){
      
      
  axios.post("http://localhost:3002/otp",{email,Hash,send:"false2"})
  .then(response=>{
if(response.data.err){
      setBad(response.data.err)
    }
    else{
      setGood(response.data)
      setBad("")
      
      
    }
  
  })
  
      }else{
        setBad("password must contain more then 8 charechters")
      }
  
  
  
    }else{
      setBad("**password doesn't match**")
    }
    
    
  }
  
  
  
  
  
  
  
  
  if(goodalert==="password changed"){
return <Redirect to="/" />
  }
  
else{
  return(
    <div>

  <nav id="bar">

  </nav>
  <br/><br/>
  <center>
  <div id="form">
  <h3 id="sign">reset password</h3>
  <br/><br/>
  {send1?<br/>: <input id="in" type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>}
  {send2?<input id="in" type="text" placeholder="otp" onChange={(e)=>setOtp(e.target.value)}/>:<br/>}
  {goodalert==="reset new password"?<input id="in" type="password" placeholder="new password" onChange={(e)=>setPassword(e.target.value)}/>:<br/>}
  <br/><br/>
  {goodalert==="reset new password"?<input id="in" type="password" placeholder="confirm" onChange={(e)=>setReset(e.target.value)}/>:<br/>}
  
  <br/><br/>
  
  <br/>
  {send1?<br/>:<button id="btn" onClick={send}>send otp</button>}
  {send2?<button id="btn" onClick={sendOtp}>submit</button>:<br/>}
  {goodalert==="reset new password"?<button id="btn" onClick={newPass}>reset</button>:<br/>}
  
  
  
  </div>
  
  
  
  

  
{goodalert?<h4 id="goodalert">{goodalert}</h4>:<h4></h4>}
  
{badalert?<h4 id="alert">{badalert}</h4>:<h4></h4>}
</center>
    </div>
    )
  }
  

  
    
  
}

export default Password