import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const CreateBlog = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeBlog = (e) => {
    const blog = e.target.value;
    setBlog(blog);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const author = AuthService.getCurrentUser();
      UserService.postPostContent(author.id, title, blog).then(
        () => {
            props.history.push("/");
            window.location.reload();
        },
        (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setLoading(false);
            setMessage(resMessage);
          }
      )} else {
        setLoading(false);
    };
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={onChangeTitle}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="blog">Blog</label>
            <Textarea
              type="textarea"
              className="form-control"
              name="blog"
              value={blog}
              onChange={onChangeBlog}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default CreateBlog;