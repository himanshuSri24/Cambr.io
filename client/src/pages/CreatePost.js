import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let history = useNavigate();
  const initialValues = {
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    if(data.postText.length !== 0){
      axios.post("http://localhost:3001/posts", data, {
        headers: {accessToken: localStorage.getItem("accessToken")}
      }).then((response) => {
        if(response.data.error){
          alert('You need to be logged in to make a new post!')
        }else{
      history("/");
      }});
    }else{
      alert('Empty Post body')
    }
  };

  return (
    <div className="createPostPage">
      <h1>New Post</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          {/* <label>Title: </label> */}
          {/* <label>Post: </label> */}
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="post text"
          />
          {/* <label>Username: </label> */}
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="username"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;