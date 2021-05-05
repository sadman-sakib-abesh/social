import {React,Fragment,useState,useEffect,createRef} from 'react'
import {Redirect,Link,useLocation} from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import ReactHashtag from "react-hashtag";


const Comment=()=>{
const name=localStorage.getItem("name")
  const id=localStorage.getItem("id")
  const mail=localStorage.getItem("email")
  const {search}= useLocation()
  const {_id_}=queryString.parse(search );
const [liked,setLiked]=useState([])
  
  const [cmnt,setCmnt]=useState("")
  const [posts,setPosts]=useState([])
  
const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
    localStorage.removeItem("email")
    window.location.reload(false)
  }
  
  const post=()=>{
if(cmnt===""){
        return false
      }
      else{
    
    axios.post("https://repeated-fir-promotion.glitch.me/comment",{_id_,id,name,cmnt,like:[]}).then(response=>{
      
    
      alert(response.data)
      
    })
      }
  }
  
const like=(e)=>{
    axios.put("https://repeated-fir-promotion.glitch.me/like_cmnt",{id,name,ema:e}).then(response=>{
      

  })
  }
  const letliked=(e)=>{
    setLiked(e)
document.getElementById("bar2").style.display="block"
  }
  
  
  
  useEffect(()=>{
    axios.get("https://repeated-fir-promotion.glitch.me/comment-o/"+_id_).then(response=>{
      setPosts(response.data)
    })
    
  })
  
const hide=()=>{
  setLiked([])
document.getElementById("bar2").style.display="none"
}
  
  
  if(name===null && mail===null && id===null){
    return <Redirect to="/Login" />
  }
  else{
  return(
    <div>
  
 <span id="head">Comment<span id="note-2">{posts.length}</span></span>
 
  <nav id="bar">
<center>
<button onClick={logout} id="btn-2">log out</button>
</center>
  </nav>
    <br/><br/><br/>
  <div id="bar2">
  <span id="white" class="far fa-times-circle" onClick={hide}></span>
  <br/><br/><br/>
  {liked.map(res=>
  <div>
  <Link id="b" to={`/Other?_name_=${res.name}&_id_=${res.id}`}>{res.name}</Link>&nbsp;&nbsp;&nbsp;<span id="like2" class="fa fa-heart"></span><br/>
  </div>
  )}
  </div>
    
    <div>
  {
  posts.map(record=>
  <div>
  <br/><br/>
  <div id="cmnt-post">
  <b><Link id="b" to={`/Other?_name_=${record.name}&_id_=${record.id}`}>{record.name}</Link></b>
  &nbsp;{JSON.stringify(record.like).includes(id)?<span id="like" onClick={()=>like(record._id)} class="fa fa-heart"></span>:<span id="like_w" onClick={()=>like(record._id)} class="far fa-heart"></span>}
&nbsp;&nbsp;<span id="date" onClick={()=>letliked(record.like)}>{record.like.length}</span>
  <br/>
  {record.cmnt}

  </div>
    </div>
  )
  }
    </div>
    
    <div id="com-in">
    <input type="text" onChange={(e)=>setCmnt(e.target.value)} placeholder="Comment" id="cmnt-in"/>&nbsp;&nbsp;<button onClick={post} id="btn-in">post</button>
   </div>
    </div>
    )
    
  }
    
    
    
    
    
}

export default Comment