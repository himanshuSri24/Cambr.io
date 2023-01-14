import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoToTop from "../GoToTop"

import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const [commentEdited, setCommentEdited] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
      console.log(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id, commentEdited]);

  const addComment = () => {
    if(newComment.length !== 0){
    axios.post("http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {accessToken: localStorage.getItem("accessToken")}
        }).then((response) => {
          if (response.data.error) {
            alert('You need to be logged in ')
          } else {
            const commentToAdd = {
              commentBody: response.data.commentBody,
              username: response.data.username,
              id: response.data.id,
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
  }else{
    alert('Empty comment body')
  }
};

const deleteComment = (id) => {
  axios
    .delete(`http://localhost:3001/comments/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      setComments(
        comments.filter((val) => {
          return val.id !== id;
        })
      );
    });
};

const deletePost = (id) => {
  axios
    .delete(`http://localhost:3001/posts/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      window.location.replace("/")
      alert("Post deleted")
    });
};

const editPost = (option) => {
  
    let newPostText = prompt("Enter New Text:");
    if(newPostText){
    axios.put(
      "http://localhost:3001/posts/postText",
      {
        newText: newPostText,
        id: id,
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );

    setPostObject({ ...postObject, postText: newPostText });
    }
};

const editComment = (option) => {
  
  let newCommentText = prompt("Enter New Text:");
  if(newCommentText){
  axios.put(
    "http://localhost:3001/comments/commentText",
    {
      newText: newCommentText,
      id: option,
    },
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
  let newCommentList = [...comments];
  newCommentList[option] = newCommentText
  setComments(newCommentList);
  if(commentEdited){
    setCommentEdited(false)
  }else{
    setCommentEdited(true)
  }
}
};

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="footer">{postObject.username}</div>
          <div className="body">{postObject.postText}
          {/* <div id="dateTime">{postObject.createdAt.substring(8,10)} - {postObject.createdAt.substring(5,7)} - {postObject.createdAt.substring(0,4)}</div> */}
        </div>
        </div>
        <div className="postButtons">
        {authState.username === postObject.username &&
                <button id="delPost" onClick={() => {deletePost(postObject.id)}}>Delete</button>
        }
        
        {authState.username === postObject.username &&
         <button id="editPost"  onClick={() => {
          if (authState.username === postObject.username) {
            editPost("body");
          }}}>Edit</button> 
        }
        </div>
        {/* <div className="likeCountIcon">
          <label> {postObject.Likes.length}</label>
          <img className="likeIcon" src="/liked.png" alt=" " onClick={() => {likeAPost(postObject.id)}}/>
        </div> */}
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="comment"
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <div className="commentInside">
                  {comment.commentBody}
                  <br/>
                  <label>{comment.username}</label>
                </div>
                
                {authState.username === comment.username &&
                <button id="editComment" onClick={() => {editComment(comment.id)}}>Edit</button>
                }
                {authState.username === comment.username &&
                <button className="delComment" onClick={() => {deleteComment(comment.id)}}>X</button>
                }
              </div>
            );
          })}
        </div>
      </div>
      <GoToTop/>
    </div>
    
  );
}

export default Post;