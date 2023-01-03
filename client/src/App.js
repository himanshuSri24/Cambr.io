import "./App.css";
import React from "react"
import Home from "./pages/Home"
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost"
import Register from "./pages/Register"
import Login from "./pages/Login"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
      <Router>
        <div className = "navbar">
          <Link to='/'>Home</Link>
          <Link to="/createpost"> Create A Post</Link>
          <Link to="/register"> Register </Link>
          <Link to="/login"> Login </Link>
        </div>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/createpost' element = {<CreatePost/>}></Route>
          <Route path="/post/:id" element = {<Post/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/register" element = {<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;