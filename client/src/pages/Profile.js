import axios from "axios";
import React, { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom"

function Profile() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [userDetails, setUserDetails] = useState([]); 
    let username = useLocation().pathname
    const user = username.substring(9)
    // console.log(user)

    let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${user}`).then((response) => {
      setListOfPosts(response.data);
    })
    axios.get(`http://localhost:3001/auth/prof/${user}`).then((response) => {
      setUserDetails(response.data);
      // console.log('Something');
      // console.log(userDetails)
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

console.log(userDetails)
  return (
    <>
    <div className="details">
      <h1>{user}</h1>
      {/* <div> */}
        <h2>
        <p>First Name : {userDetails.firstname}</p>
        <p>Last Name: {userDetails.lastname}</p>
        <p>Semester : {userDetails.sem}</p>
        <p>Mail ID : {userDetails.collegemail}</p>
        <p>Phone Number : {userDetails.mob}</p>
        <div id="sep"></div>
        <h1>Posts by {userDetails.username}</h1>        
        </h2>
      {/* </div> */}
    </div>
    <div className="postList">{listOfPosts.map((value, key) => {
       
      return (
          <>
          <div className="likeCountIcon">
          <label> {value.Likes.length}</label>
          <img className="likeIcon" src="/liked.png" alt=" " onClick={() => {likeAPost(value.id)}}/>
          </div>
          <div className="post" onClick={() => {navigate(`/post/${value.id}`)}}>
            <div className="footer">{value.username}</div>
            <div className="body">{value.postText}</div>
            {/* <div className="title"> {value.title} </div> */}
            <div className="dateTime">{value.createdAt.substring(8,10)} - {value.createdAt.substring(5,7)} - {value.createdAt.substring(0,4)}</div>
          </div>
          
          </>
          
        );
      })}</div>
  </>
  )
}

export default Profile