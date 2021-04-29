import React from 'react'
import './App.css';
import $ from 'jquery'
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
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

$(document).ready(function(){
  $("#menu").click(function(){
    $("#bar").toggle();
  });
});

 

class App extends React.Component{
  
  
  
  render(){
  return (
    <div className="App">
    <Router>
    <nav id="header">
    <img src={header} height="50px"/>
    <i id="menu"></i>
    </nav>
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
    
</Switch>
  
 <nav id="footer">
<Link to="/" id="project"></Link>
<Link to="/Notification" id="trophy"></Link>
<Link to="/Post" id="plus"></Link>
<Link to="/Bookmark" id="bookmark"></Link>
<Link to="/Profile" id="user"></Link>
  </nav>
    </Router>
    
     
    </div>
  );
}
}
export default App;
