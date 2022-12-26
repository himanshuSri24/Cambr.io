import "./App.css";
import React from "react"
import Home from "./pages/Home"
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
      <Router>
        <div className = "navbar">
      <Link to='/'>Home</Link>
        <Link to="/createpost"> Create A Post</Link>
        </div>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/createpost' element = {<CreatePost/>}></Route>
          <Route path="/post/:id" element = {<Post/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;