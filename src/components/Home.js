import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);

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
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
      {allBlogs.map((item) => {
          return(
            <div className="card" key={item._id}> 
              <a href={"/posts/"+item._id}><h3>{item.title}</h3></a> 
              <p>{item.author} - {item.timestamp}</p>
              
            </div> 

          )
        })}
      </header>
    </div>
  );
};

export default Home;