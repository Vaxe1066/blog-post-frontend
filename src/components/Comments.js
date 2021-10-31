import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";


const Comments = (props) => {
  const form = useRef();
  const checkBtn = useRef();


  const [comments, setComments] = useState([]);
  const [commentOn, setCommentOn] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [curUser, setCurUser] = useState(undefined);
  const [userMessage, setUserMessage] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [deleteChange, setDeleteChange] = useState(false);

  let { id } = useParams();



  useEffect(() => {
    UserService.getComments(id).then(
      (response) => {
        setComments(response.data);
        setMessage("");
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setComments(_content);
      }
    );
  }, [loading, deleteChange ]);


  useEffect(() => {
    const author = AuthService.getCurrentUser();
    setCurUser(author);
  }, [])



  const onChangeComment = (e) => {
    let comment = e.target.value;
    setNewComment(comment);
  }

  const onDeleteComment = (e) => {
    //console.log(e.target.id);
    setDeleteChange(false);
    const deletePrompt = window.confirm("Are you sure you want to delete this comment?")
    if(deletePrompt !=null){
      UserService.deleteComment(e.target.id).then(
        (response) => {
          setDeleteChange(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      )
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (checkBtn.current.context._errors.length === 0) {
      const author = AuthService.getCurrentUser();
      UserService.postComment(id, newComment, author.id).then(
        (response) => {
          setMessage("Successfully added comment");
          setSuccessful(true);
          setLoading(false);
          setNewComment("");
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
            setSuccessful(false);
            setNewComment("");
          }
      )} else {
        setLoading(false);
        setSuccessful(true);
    };
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <div className="comments"> 
        <h4> Comments </h4>

      {curUser ? (
      <div>
        <p>Leave Comment</p>
        <Form onSubmit={handleSubmit} ref={form}>
        <Textarea
          type="textarea"
          className="form-control"
          name="comment"
          value={newComment}
          onChange={onChangeComment}
        />
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
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      ) : <p>To leave a comment please <a href="/login" >sign in</a> or <a href="/register">register</a> to create an account</p>}

 
        
        {comments.map((item) => {
        return(
            <div className="card" key={item._id}> 
              <p>{item.author.username} </p>
              <p>{item.comment}</p>
              <p>{item.timestamp}</p>
              {curUser ? item.author._id === curUser.id ?
                <input className="delete-btn" id={item._id}
                type="image" 
                alt="icon to delete the comment" 
                src="/Delete.svg" 
                title="Delete Comment"
                onClick={onDeleteComment}>
              </input>
              : "" : ""
              }
            </div> 
        )
        })}
            
        </div>
      </header>
    </div>
  );
};

export default Comments;