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
    <div>{listOfPosts.map((value, key) => {
        return (
          <div className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="title"> {value.title} </div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>  
        );
        <img
        src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
        alt="car"
      />
      })}</div>
  )
}

export default Home