import axios from "axios";
import React, { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom"

function Profile() {
    const [listOfPosts, setListOfPosts] = useState([]);
    
    let username = useLocation().pathname
    const user = username.substring(9)
    // console.log(user)

    let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${user}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
// /*
  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                // alert("Liked")
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                // alert("Unliked")
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };  
// */
  return (
    <div className="postLists">{listOfPosts.map((value, key) => {
       
      return (
          <div>
          <div className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="footer">{value.username}</div>
            <div className="body">{value.postText}</div>
            {/* <div className="title"> {value.title} </div> */}
            <div className="dateTime">{value.createdAt.substring(8,10)} - {value.createdAt.substring(5,7)} - {value.createdAt.substring(0,4)}</div>
          </div>
          <div className="likeCountIcon">
          <label> {value.Likes.length}</label>
          <img className="likeIcon" src="/liked.png" alt=" " onClick={() => {likeAPost(value.id)}}/>
          </div>
          
          </div>
          
        );
      })}</div>
  )
}

export default Profile