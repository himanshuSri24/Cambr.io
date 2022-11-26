import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(20).required(),
  });

  return (
    <div className="createPostPage">
      <Formik>
        <Form
          className="formContainer"
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <label>Title : </label>
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="John (for eg.)"
          />
          <label>Post : </label>
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="lmao (for eg.)"
          />
          <label>Username : </label>
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="John123 (for eg.)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
