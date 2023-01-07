import "./App.css";
import React from "react"
import Home from "./pages/Home"
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost"
import Register from "./pages/Register"
import Login from "./pages/Login"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  
  const logoutFunc = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  }

  useEffect(() => {
    axios.get("http://localhost:3001/auth/checkLogin", {headers: {accessToken: localStorage.getItem("accessToken"),},})
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, [authState]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className = "navbar">
          <Link to='/'>Home</Link>
          <Link to="/createpost"> Create A Post</Link>
          {!authState.status &&
            <>
              <Link to="/login"> Login </Link>
              <Link to="/register"> Register </Link>
            </>
          }
          {authState.status &&
          <button className="logout" onClick={logoutFunc}>Logout</button>
          }
          </div>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/createpost' element = {<CreatePost/>}></Route>
          <Route path="/post/:id" element = {<Post/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/register" element = {<Register/>} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;