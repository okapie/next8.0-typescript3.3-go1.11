import axios from "axios";
import ENV from "../../config/env";

export const client = () =>
  axios.create({
    baseURL: `${ENV.PATH}/api/v1`,
    // headers: {
    //   credentials: "include"
    //   // Accept: "application/json",
    //   // "Content-Type": "application/json"
    // }
    transformRequest: [
      data => {
        return JSON.stringify(data);
      }
    ]
  });
