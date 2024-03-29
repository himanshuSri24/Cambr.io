import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);


  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if(response.data.error) alert(response.data.error); 
        else{
            localStorage.setItem("accessToken", response.data.token)  
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
            window.location.replace('/')
        }
    });
  };
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      {/* <label>Username:</label> */}
      <input
        type="text"
        placeholder="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      {/* <label>Password:</label> */}
      <input
        type="password"
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;