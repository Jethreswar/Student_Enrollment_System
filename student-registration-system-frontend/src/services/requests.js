import axios from "axios";

// Setting Access Token
// axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
//   localStorage.getItem("access_token")
// )}`;

// Base URl
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const post_request = (url, body) => {
  return axios.post(url, body);
};
const get_request = (url, getparams = {}) => {
  return axios.get(url, { params: getparams });
};
const put_request = (url, body) => {
  return axios.put(url, body);
};

const delete_request = (url) => {
  return axios.delete(url);
};

export { post_request, get_request, put_request, delete_request };
