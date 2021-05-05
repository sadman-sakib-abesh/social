import {React,Fragment,useState,useEffect} from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import ReactMarkdown from 'react-markdown'
import ReactHashtag from "react-hashtag";

const Profile=()=>{
  
const d=new Date()
  const date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" time-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  
  
  
  const [edit,setEdit]=useState(false)
const [liked,setLiked]=useState([])
const [posts,setPosts]=useState([])
const [data,setData]=useState([])
const [bio,setBio]=useState("")
const [fb,setFb]=useState("")
const [tw,setTw]=useState("")
const [li,setLi]=useState("")
const [name,setName]=useState(localStorage.getItem("name")) 
const id=localStorage.getItem("id")
  const mail=localStorage.getItem("email")
  
  const letedit=()=>{
    
    if(edit===false){
      setName(data[0].name)
    setBio(data[0].bio)
    setFb(data[0].fb)
    setTw(data[0].tw)
    setLi(data[0].li)
    setEdit(true)
    }else{
      setEdit(false)
    }
    
    
  }
  
  
  
  const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
window.location.reload(false)
  }
  
const like=(e)=>{
    axios.put("https://repeated-fir-promotion.glitch.me/like",{id,name,ema:e}).then(response=>{
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






const load=(a,b)=>{
  window.location.replace(`/#/Other?_name_=${a}&_id_=${b}`)
}


const save=()=>{
    axios.put("https://repeated-fir-promotion.glitch.me/save",{id,name,bio,fb,li,tw}).then(response=>{
    alert(response.data)
    setEdit(false)
  })
setTimeout(()=>{
  localStorage.setItem("name",name)
},500)
  
  
}


const del=(e)=>{
  axios.delete("https://repeated-fir-promotion.glitch.me/del/"+e).then(response=>{
  alert(response.data)
})
}



useEffect(()=>{
    
    axios.get("https://repeated-fir-promotion.glitch.me/profile_o/"+id).then(response=>{
      setPosts(response.data)
    })
    axios.get("https://repeated-fir-promotion.glitch.me/profile_u/"+id).then(response=>{
     setData(response.data)
    })
    
    
    
    
    
})

  
  
  
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
 
  {
    data.map(record=><div>
 <br/><br/><br/><br/><span id="o_name">{record.name}</span>
 
&nbsp;
<i id="admin-2" class={record.team}></i> &nbsp;
<i id="admin" class={record.certificate}></i><br/><br/>
&nbsp;

 
&nbsp;
    <span id="note" onClick={()=>letliked(record.follower)}>follower:{record.follower.length}</span>&nbsp;&nbsp;&nbsp;<span id="note" onClick={()=>letliked(record.following)}>following:{record.following.length}</span>
    
    

<br/>
<br/>

<br/>
<br/>
<label id="mark">skill field</label>
<div id="bio">
 {record.bio?<div id="b">{record.bio}</div>:<div id="b">nothing in bio</div>}<br/>
 
{record.fb?<a id="social" class="fab fa-facebook" href={`${record.fb}`}></a>:<span/>}&nbsp;&nbsp;&nbsp;&nbsp;
{record.tw?<a id="social" href={`${record.tw}`} class="fab fa-twitter"></a>:<span/>}&nbsp;&nbsp;&nbsp;&nbsp;
{record.li?<a id="social" href={`${record.li}`} class="fab fa-linkedin-in"></a>:<span/>}
   </div>
    
    
    
    
  
    
   
    </div>)
  }
  
  
  <span id="head">profile</span><br/>
 
  <center>
 <h3 id="btn" onClick={letedit}>edit your profile</h3></center>
 <br/><br/><br/>
 {edit?<div>
 <input type="url" id="in" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name"/><br/><br/>
<textarea rows="7" value={bio} cols="42" onChange={(e)=>setBio(e.target.value)} placeholder="Write your skill field(bio)..."/><br/>

 <input type="url" id="in" value={fb} onChange={(e)=>setFb(e.target.value)} placeholder="facebook"/> <i class="fab fa-facebook"></i><br/><br/><br/>
 <input type="url" value={tw} id="in" onChange={(e)=>setTw(e.target.value)} placeholder="twitter"/><i class="fab fa-twitter"></i><br/><br/><br/>
 <input type="url" value={li} id="in" onChange={(e)=>setLi(e.target.value)} placeholder="linkdin"/><i class="fab fa-linkedin"></i><br/><br/><br/>
 <br/>
 <button id="btn" onClick={save}>save changes</button>
  </div>:<span></span>}
  
  
  
  
  
  
  <div id="bar2">
  <span id="white" class="far fa-times-circle" onClick={hide}></span>
  <br/><br/><br/>
  {liked.map(res=>
  <div>
<span id="b" class="fas fa-user-circle"></span>&nbsp;&nbsp;&nbsp;
  <Link onClick={()=>load(res.name,res.id)} id="b" to={`/Other?_name_=${res.name}&_id_=${res.id}`}>{res.name}</Link><br/>
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
                <span className="hashtag">{hashtagValue}</span>
            )}>
          {record.post}
   </ReactHashtag>
   
   {record.md===""?<br/>:<div id="md"><ReactMarkdown>{record.md}</ReactMarkdown></div>}
   </div>:<div>
   <div id="shared">
   <span class="fa fa-share"></span> from <b><Link id="b" to={`/Other?_name_=${record.share.name}&_id_=${record.share.id}`}>{record.share.name}</Link></b><span id="date">{record.share.date}</span></div>
   <ReactHashtag renderHashtag={(hashtagValue) => (
                <span className="hashtag">{hashtagValue}</span>
            )}>
          {record.share.post}
   </ReactHashtag>
   
   {record.share.md===""?<br/>:<div id="md"><ReactMarkdown>{record.share.md}</ReactMarkdown></div>}
   </div>
  
}
   
   </div>
   

  
<Link class="fa fa-comment" id="comment" to={`/Comment?_id_=${record._id}`}></Link>

<i class="far fa-bookmark" id="comment"></i>


<span class="far fa-trash-alt" id="trash" onClick={()=>del(record._id)} aria-hidden="true"></span>


{JSON.stringify(record.like).includes(id)?<span id="like" onClick={()=>like(record._id)} class="fa fa-heart"></span>:<span id="like_w" onClick={()=>like(record._id)} class="fa fa-heart-o"></span>}
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
    
  
 

    </>
    )
  }
}

export default Profile