import axios from "axios";

export default axios.create({
  timeout: 15000,
  baseURL: "http://localhost:1080"
});

export type StandardError = {
  message: string;
};
