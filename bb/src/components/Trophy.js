import {React,useEffect,useState} from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from 'axios'




const Trophy = () => {
  
 const name=localStorage.getItem("name")
  const id=localStorage.getItem("id")
  const [not,setNot]=useState([])
  
  
  const logout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("id")
window.location.reload(false)
  }
  
  
  
  
  useEffect(()=>{
    axios.get("https://repeated-fir-promotion.glitch.me/notification/"+id).then(response=>{
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
  <br/><br/><br/><br/><span id="head">notification</span>
{not.map(record=><div key={record._id}>
<div id="card">
<span id="date">{record.date}</span><br/>
<b><Link id="b" to={`/Other?_name_=${record.name}&_id_=${record.id}`}>{record.name}</Link></b> {record.msg}
</div><br/>
</div>
)}
  
  <br/><br/>
    </div>
    )
  }
}

export default Trophy