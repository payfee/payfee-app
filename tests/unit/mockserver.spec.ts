import { mockServerClient } from "mockserver-client";

const client = mockServerClient("localhost", 1080);

describe("Configure mockserver", () => {
	it("registration", async () => {
		await client.mockAnyResponse({
			httpRequest: {
				path: "/v1/users",
				method: "POST",
			},
			httpResponse: {
				statusCode: 201,
				delay: {
					timeUnit: "SECONDS",
					value: 2,
				},
				headers: {
					"content-type": ["application/json"],
				},
				body: {
					user_id: "12345",
				},
			},
		});
	});
});
