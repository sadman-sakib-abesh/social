import {React,useState,useEffect} from 'react'
import {Link,BrowserRouter as Router,Redirect} from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import ReactHashtag from "react-hashtag";


const Feed=()=>{
  
const d=new Date()
  const date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" time-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  
  
  const name=localStorage.getItem("name")
  const mail=localStorage.getItem("email")
  const id=localStorage.getItem("id")

  const [posts,setPosts]=useState([])
  const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
    localStorage.removeItem("email")
    window.location.reload(false)
  }

  const [liked,setLiked]=useState([])
  
  useEffect(()=>{
    
    axios.get("http://localhost:3002/newsfeed").then(response=>{
      setPosts(response.data)
    })
})
  
  
  const like=(e)=>{
    axios.post("http://localhost:3002/like",{id,name,ema:e}).then(response=>{
      

  })
  }
  const letliked=(e)=>{
    setLiked(e)
document.getElementById("bar2").style.display="block"
  }

const hide=()=>{
  setLiked([])
document.getElementById("bar2").style.display="none"
}


const share=(e,b)=>{
  axios.post("http://localhost:3002/share",{id,name,mail,date,like:[],share:e}).then(response=>{
    alert(response.data)
    })
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
  <br/><br/><br/><span id="head">home</span>
  
  <div id="bar2">
  <span id="white" class="far fa-times-circle" onClick={hide}></span>
  <br/><br/>
  {liked.map(res=>
  <div>
  <Link id="b" to={`/Other?_name_=${res.name}&_id_=${res.id}`}>{res.name}</Link>&nbsp;&nbsp;&nbsp;<span id="like2" class="fa fa-heart"></span><br/>
  </div>
  )}
  </div>
   <br />
    <br/>
  
  {posts.map(record=>

  <div key={record._id}>
  <div id={record._id}/>
  <br/>
   <div id="post">
  <b id="click"> <Link id="b" to={`/Other?_name_=${record.name}&_id_=${record.id}`}>{record.name}</Link></b>
<span id="date">{record.date}</span>
   <div id="post-in">
{record.share===""?<div>
   <ReactHashtag renderHashtag={(hashtagValue) => (
                <div className="hashtag">{hashtagValue}</div>
            )}>
          {record.post}
   </ReactHashtag>
   
   {record.md===""?<br/>:<div id="md"><ReactMarkdown>{record.md}</ReactMarkdown></div>}
   </div>:<div>
   <div id="shared">
   <span class="fa fa-share"></span> from <b><Link id="b" to={`/Other?_name_=${record.share.name}&_id_=${record.share.id}`}>{record.share.name}</Link></b><span id="date">{record.share.date}</span></div>
   <ReactHashtag renderHashtag={(hashtagValue) => (
                <div className="hashtag">{hashtagValue}</div>
            )}>
          {record.share.post}
   </ReactHashtag>
   
   {record.share.md===""?<br/>:<div id="md"><ReactMarkdown>{record.share.md}</ReactMarkdown></div>}
   </div>
  
}
   
   </div>
   

  
<i class="fa fa-comment" id="comment"></i>

<i class="far fa-bookmark" id="comment"></i>

{record.share.name===name || record.name===name || JSON.stringify(record.share).includes(record.share.name)?<span></span>:<i class="fa fa-share" id="comment"onClick={()=>share(record)}></i>}


{JSON.stringify(record.like).includes(name)?<span id="like" onClick={()=>like(record._id)} class="fa fa-heart"></span>:<span id="like_w" onClick={()=>like(record._id)} class="far fa-heart"></span>}
&nbsp;&nbsp;<span id="date" onClick={()=>letliked(record.like)}>{record.like.length}</span>



 </div>
 </div>
  )}
 <br />
    <br/>
  <br/>
 <br />
    <br/>
  <br/>
    
  
 

    </div>
    )
  }
}

export default Feed