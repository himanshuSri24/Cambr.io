import "./App.css";
import React from "react"
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
      Hello
      <Router>
      <Link to='/'>Home</Link>
        <Link to='/createpost'>CreatePost</Link>
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;