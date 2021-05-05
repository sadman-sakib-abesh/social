import {React,useEffect,useState} from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from 'axios'




const Bookmark = () => {
  
 const name=localStorage.getItem("name")
  const id=localStorage.getItem("id")
  const [not,setNot]=useState([])
  
  
  const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
window.location.reload(false)
  }
  
  
  
  
  useEffect(()=>{
    axios.get("https://repeated-fir-promotion.glitch.me/bookmarked/"+id).then(response=>{
      setNot(response.data)
      
    })
    
  })
  
  
  
  
  
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
  <br/><br/><br/><br/><span id="head">bookmarks</span>
{not.map(record=><div key={record._id}>
<div id="card">
<Link id="book" to={`/Page?id_=${record._id_}`}>you bookmarked <b>{`${record.name}'s`} </b>post</Link>
</div><br/>
</div>
)}
  
  
    </div>
    )
  }
}

export default Bookmark