import axios from "axios";

export default axios.create({
  timeout: 15000,
  baseURL: "/api"
});

export type StandardError = {
  message: string;
};

export type ErrorHandling = {
  success: boolean;
  error?: StandardError;
};
