import {
    get_request,
  } from "./requests";

  
const getLogs = (params) => {
    return new Promise((resolve, reject) => {
      get_request("logs/", params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


export { getLogs };