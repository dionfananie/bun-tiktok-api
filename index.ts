import type { BunRequest, Server } from "bun";
import generateCodeVerifier from "./src/helpers/generateCodeVerifier";

interface DataResponseUser extends Server {
  user?: {
    data: {
      user: {
        union_id: string;
        avatar_url: string;
        display_name: string;
        open_id: string;
      };
    };
    error: {
      code: string;
      message: string;
      log_id: string;
    };
  };
}
const server = Bun.serve({
  port: process.env.PORT,

  routes: {
    "/": (req, res) => {
      console.log("req: ", req);
      //   console.log("req: ", req.params);
      //   console.log("res: ", res);

      const url = new URL(req.url);
      const queryParams = new URLSearchParams(url.search);
      console.log(queryParams);

      return new Response("Hello with Bun!");
    },
    "/oauth": () => {
      const codeVerifier = generateCodeVerifier();
      const csrfState = Math.random().toString(36).substring(2);
      //   res.cookie("csrfState", csrfState, { maxAge: 60000 });

      const urlSearch = new URLSearchParams();
      urlSearch.append("client_key", process.env.CLIENT_KEY || "");
      urlSearch.append("scope", process.env.CLIENT_SCOPES || "");
      urlSearch.append("response_type", "code");
      urlSearch.append("redirect_uri", process.env.URL_REDIRECT || "");
      urlSearch.append("state", csrfState);
      urlSearch.append("code_challenge", codeVerifier);
      urlSearch.append("code_challenge_method", "S256");

      return Response.redirect(
        `${process.env.URL_AUTH}/auth/authorize?${urlSearch.toString()}`
      );
    },
    "/callback": async (req: BunRequest, res: DataResponseUser) => {
      const url = new URL(req.url);
      const queryParams = new URLSearchParams(url.search);
      console.log(queryParams);
      const code = queryParams.get("code") || "";

      if (!code) {
        return new Response("Authorization code is missing", { status: 400 });
      }
      const tokenResponse = await fetch(
        `${process.env.URL_FETCH}/oauth/token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            code: String(code),
            client_key: process.env.CLIENT_KEY || "",
            client_secret: process.env.CLIENT_SECRET || "",
            redirect_uri: process.env.URL_REDIRECT || "",
            grant_type: "authorization_code",
          }).toString(),
        }
      );

      if (!tokenResponse.ok) {
        throw new Error("Failed to exchange authorization code for token");
      }
      const tokenData = await tokenResponse.json();

      const response = await fetch(
        `${process.env.URL_FETCH}/user/info/?fields=open_id,union_id,avatar_url,display_name`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
      const resp = await response.json();
      res.user = resp;
      return Response.redirect("/user");
    },
    "/user": (_, res: DataResponseUser) => {
      return Response.json(res.user);
    },
  },
  // @ts-expect-error: error expected
  tls: {
    key: Bun.file(".ssl/key.pem"),
    cert: Bun.file(".ssl/cert.pem"),
  },
});

console.log(`running in ${server.port}`);
