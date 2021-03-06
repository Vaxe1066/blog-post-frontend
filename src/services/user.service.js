import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://powerful-caverns-14334.herokuapp.com/api/posts/"

const getPublicContent = () => {
    return axios.get(API_URL);
};


const getPostContent = (id) => {
    return axios.get(API_URL+id)
}


const postPostContent = (author, title, blog) => {
    return axios.post(API_URL, {
        author,
        blog,
        title,
    }, { headers: authHeader() })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

//delete post 
const deletePost = (id) => {
    return axios.delete("https://powerful-caverns-14334.herokuapp.com/api/posts/"+id, { headers: authHeader() })
}


// get comments data 
const getComments = (id) => {
    return axios.get(API_URL+id+"/comments")
}

//create comments 
const postComment = (id, comment, author) => {
    return axios.post(API_URL+id+"/comments", {
        comment,
        author,
    }, { headers: authHeader() })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}


//delete comment 

const deleteComment = (id) => {
    return axios.delete("https://powerful-caverns-14334.herokuapp.com/api/comments/"+id, { headers: authHeader() })
}



export default {
    getPublicContent,
    getPostContent,
    postPostContent,
    getComments,
    postComment,
    deleteComment,
    deletePost
  };