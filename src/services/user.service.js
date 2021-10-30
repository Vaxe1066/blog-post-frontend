import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/posts/"

const getPublicContent = () => {
    return axios.get(API_URL);
};


const getPostContent = (id) => {
    return axios.get(API_URL+id)
}


export default {
    getPublicContent,
    getPostContent,
  };