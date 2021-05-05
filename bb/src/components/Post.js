import {React,Fragment,useState} from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from 'axios'

const Post=()=>{
const [goodalert,setGood]=useState("")
  const [badalert,setAlert]=useState("")
  const [post,setPost]=useState("")
 const name=localStorage.getItem("name")
 const mail=localStorage.getItem("email")
 const [md,setMd]=useState("")
  const id=localStorage.getItem("id")
 const d=new Date()
  const date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" time-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  
  const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
    localStorage.removeItem("email")
window.location.reload(false)
  }
  
  const like=[]
  
const submit=()=>{
  axios.post("https://repeated-fir-promotion.glitch.me/post",{id,name,mail,date,post,md,like,share:""}).then(response=>{
    if(response.data.err){
      setAlert(response.data.err)
    }else{
    setGood(response.data)
    }
  })
}




if(localStorage.getItem("name")===null && localStorage.getItem("id")===null){
    return <Redirect to="/Login" />
  }
  else{
  return(
    <>
 <nav id="bar">
<center>
<button onClick={logout} id="btn-2">log out</button>
</center>
  </nav>
 <br/><br/><br/><span id="head">post</span>
  <br />

<textarea rows="7" cols="42" onChange={(e)=>{setPost(e.target.value)}} placeholder="Write your post..."></textarea><br/>
<textarea rows="5" cols="42" onChange={(e)=>{setMd(e.target.value)}} placeholder="Write markdown if you have(.md)"></textarea><br/>
<center><button id="btn" onClick={submit}>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  post a note &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;</button></center>
<br/><br /><br />
  <center>
{goodalert?<h4 id="goodalert">{goodalert}</h4>:<h4></h4>}
  
{badalert?<h4 id="alert">{badalert}</h4>:<h4></h4>}
  </center>
  
    </>
    )
}
  
}

export default Post