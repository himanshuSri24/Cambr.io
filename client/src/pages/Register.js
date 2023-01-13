import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    mob: "",
    collegemail: "",
    sem: "",
    branch: ""
  };

  let history = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    firstname: Yup.string().min(2).max(30).required("Your first name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastname: Yup.string().min(2).max(30).required("Your last name is required").matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field "),
    mob: Yup.string().min(10).max(10).required("Your mobile number is required").matches(/^[0-9]+$/, "Invalid mobile number"),
    collegemail: Yup.string().email().required("Your college mail id is required"),
    sem: Yup.number().min(1).max(8),
    branch: Yup.string().max(5),
  });


  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
        window.location.reload()
      }
      else{
          console.log(data);
        history("/login")
      }
  });
  };

  return (
    <div className="registerContainer">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          {/* <label>Username: </label> */}
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="username"
          />

          {/* <label>Password: </label> */}
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="new password"
          />

          <ErrorMessage name="firstname" component="span" />
          <Field
            autocomplete="on"
            id="inputCreatePost"
            name="firstname"
            placeholder="first name"
          />

          <ErrorMessage name="lastname" component="span" />
          <Field
            autocomplete="on"
            id="inputCreatePost"
            name="lastname"
            placeholder="last name"
          />

          <ErrorMessage name="mob" component="span" />
          <Field
            autocomplete="on"
            id="inputCreatePost"
            name="mob"
            placeholder="mobile number"
          />

          <ErrorMessage name="collegemail" component="span" />
          <Field
            autocomplete="on"
            id="inputCreatePost"
            name="collegemail"
            placeholder="college mail id"
          />

          <ErrorMessage name="sem" component="span" />
          <Field
            autocomplete="on"
            id="inputCreatePost"
            name="sem"
            placeholder="semester"
          />

          <ErrorMessage name="branch" component="span" />
          <Field
            autocomplete="on"
            id="inputCreatePost"
            name="branch"
            placeholder="branch"
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;