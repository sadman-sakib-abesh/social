import React from 'react'
import './App.css';
import $ from 'jquery'
import {HashRouter as Router,Switch,Route,Link} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Bookmark from './components/Bookmark'
import Projects from './components/Projects'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Notification from './components/Trophy'
import Comment from './components/Comment'
import Password from './components/Password'
import Other from './components/Other'
import Post from './components/Post'
import header from './header.png'
import Page from './components/page'



$(document).ready(function(){
  $("#menu").click(function(){
    $("#bar").toggle();
  });
});

 

class App extends React.Component{
  
  
loade=()=>{
  window.location.replace("/#/Profile")
}
  render(){
  return (
    <div>
    <Router>
    <nav id="header">
    <img src={header} height="50px"/>

    <i id="menu"></i>
<Link class="fa fa-search" id="serch" to="/Projects"></Link>
  
    </nav>
    <div>
<Switch>
    <Route exact path="/" component={Feed}/>
    <Route path="/Signup" component={Signup}/>
    <Route path="/Login" component={Login}/>
    <Route path="/Profile" component={Profile}/>
    <Route path="/Bookmark" component={Bookmark}/>
    <Route path="/Projects" component={Projects}/>
    <Route path="/Comment" component={Comment}/>
    <Route path="/Notification" component={Notification}/>
    <Route path="/Post" component={Post}/>
    <Route path="/Password" component={Password}/>


    <Route path="/Other" component={Other}/>
    <Route path="/Page" component={Page}/>
    

</Switch>
</div>
<div>
 <nav id="footer">
 <center>
<Link to="/" id="project"></Link>
<Link to="/Notification" id="trophy"></Link>
<Link to="/Post" id="plus"></Link>

<Link to="/Profile" onClick={this.loade} id="user"></Link>
<Link to="/Bookmark" id="bookmark"></Link>

</center>
  </nav>
  </div>
    </Router>
    
     
    </div>
  );
}
}
export default App;
