import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    
    let navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="postList">{listOfPosts.map((value, key) => {
       
      return (
          <div className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="footer">{value.username}</div>
            <div className="body">{value.postText}</div>
            {/* <div className="title"> {value.title} </div> */}
            <div className="dateTime">{value.createdAt.substring(8,10)} - {value.createdAt.substring(5,7)} - {value.createdAt.substring(0,4)}</div>
          </div>
        );
      })}</div>
  )
}

export default Home