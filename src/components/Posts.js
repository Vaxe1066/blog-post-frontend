import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";

import Comments from "../components/Comments"

const Posts = (props) => {
  const [curPost, setCurPost] = useState({});
  const [curAuthor, setCurAuthor] = useState('');
  const [postDate, setPostDate] = useState(undefined);
  let { id } = useParams();

  const changeDate = (dateStr) => {
    let myDate = new Date(dateStr).toLocaleDateString();
    setPostDate(myDate)
  }

  useEffect(() => {
    UserService.getPostContent(id).then(
      (response) => {
        setCurPost(response.data);
        setCurAuthor(response.data.author.username)
        changeDate(response.data.timestamp);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setCurPost(_content);
      }
    )
  }, []);


  return (
    <div className="container">
      <header className="jumbotron">
        <div className="text-center"> 
            <h3 >{curPost.title}</h3>
            <p>{curAuthor} - {postDate}</p>
            <p>{curPost.blog}</p>
            
        </div>
      </header>

      <Comments />
    </div>
  );
};

export default Posts;