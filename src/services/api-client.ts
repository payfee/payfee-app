import axios from "axios";

export default axios.create({
	timeout: 15000,
	baseURL: "http://localhost:1080",
	headers: {
		"x-user-id": "123123",
	},
});

export type StandardError = {
	message: string;
};

export type ErrorHandling = {
	success: boolean;
	error?: StandardError;
};
