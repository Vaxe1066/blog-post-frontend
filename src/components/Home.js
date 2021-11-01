import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [postDate, setPostDate] = useState(undefined);
  const [curUser, setCurUser] = useState(undefined);
  const [deleteChange, setDeleteChange] = useState(false);

  let { id } = useParams();

  const changeDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
 
  }

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setAllBlogs(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setAllBlogs(_content);
      }
    );
  }, [deleteChange]);


  useEffect(() => {
    const author = AuthService.getCurrentUser();
    setCurUser(author);

  }, [])

  const onDeleteComment = (e) => {
    //console.log(e.target.id);
    setDeleteChange(false);
    const deletePrompt = window.confirm("Are you sure you want to delete this post?")
    if(deletePrompt !=null){
      UserService.deletePost(e.target.id).then(
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

  return (
    <div className="container">
      <header className="jumbotron">

      {allBlogs.length>0 ?
        allBlogs.map((item) => {
          return(
            <div className="card" key={item._id}> 
              <a href={"/posts/"+item._id}><h3>{item.title}</h3></a> 
              {item.author ? <p>{item.author.username} - {changeDate(item.timestamp)}</p>
              : <p> - {changeDate(item.timestamp)}</p>}
              {curUser.roles[0]==="ROLE_ADMIN" ? 
                <input className="delete-btn" id={item._id}
                type="image" 
                alt="icon to delete the post" 
                src="/Delete.svg" 
                title="Delete Post"
                onClick={onDeleteComment}> 
                </input>:
                "" }
            </div> 

          )
        }) : ""
      }
      </header>
    </div>
  );
};

export default Home;