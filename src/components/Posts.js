import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";

const Posts = (props) => {
  const [curPost, setCurPost] = useState({});
  let { id } = useParams();
  useEffect(() => {
    UserService.getPostContent(id).then(
      (response) => {
        setCurPost(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setCurPost(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <div className="blog"> 
            <h3>{curPost.title}</h3>
            <p>{curPost.blog}</p>
            <p>{curPost.author} - {curPost.timestamp}</p>
            
        </div>
      </header>
    </div>
  );
};

export default Posts;