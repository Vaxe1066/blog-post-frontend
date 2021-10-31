import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [postDate, setPostDate] = useState(undefined);

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
  }, []);

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
            </div> 

          )
        }) : ""
      }
      </header>
    </div>
  );
};

export default Home;