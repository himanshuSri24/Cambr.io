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

  
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

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

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="footer">{postObject.username}</div>
          <div className="body">{postObject.postText}</div>
        </div>
        {authState.username === postObject.username &&
                <button className="delPost" onClick={() => {deletePost(postObject.id)}}>Delete</button>
                }
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