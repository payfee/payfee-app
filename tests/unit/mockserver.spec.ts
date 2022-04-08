import { mockServerClient } from "mockserver-client";

const client = mockServerClient("localhost", 1080);

describe("Configure mockserver", () => {
  it("registration", async () => {
    await client.clear("/v1/users", "ALL");
    await client.clear("/v1/login", "ALL");

    await client.mockAnyResponse({
      httpRequest: {
        path: "/v1/users",
        method: "POST"
      },
      httpResponse: {
        statusCode: 201,
        delay: {
          timeUnit: "SECONDS",
          value: 2
        },
        headers: {
          "content-type": ["application/json"]
        }
      }
    });

    await client.mockAnyResponse({
      httpRequest: {
        path: "/v1/login",
        method: "POST",
        body: {
          email: "test@user.com",
          password: "123456"
        }
      },
      httpResponse: {
        statusCode: 200,
        delay: {
          timeUnit: "SECONDS",
          value: 2
        },
        headers: {
          "content-type": ["application/json"]
        }
      }
    });

    // await client.mockAnyResponse({
    //   httpRequest: {
    //     path: "/v1/login",
    //     method: "POST"
    //   },
    //   httpResponse: {
    //     statusCode: 400,
    //     delay: {
    //       timeUnit: "SECONDS",
    //       value: 2
    //     },
    //     headers: {
    //       "content-type": ["application/json"]
    //     }
    //   }
    // });
  });
});
