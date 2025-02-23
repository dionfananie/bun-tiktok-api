import type { BunRequest } from "bun";
import type { DataResponseUser } from "../types/dataResponse";

const callbackController = async (req: BunRequest, res: DataResponseUser) => {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.search);
  console.log(queryParams);
  const code = queryParams.get("code") || "";

  if (!code) {
    return new Response("Authorization code is missing", { status: 400 });
  }
  const tokenResponse = await fetch(`${process.env.URL_FETCH}/oauth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: String(code),
      client_key: process.env.CLIENT_KEY || "",
      client_secret: process.env.CLIENT_SECRET || "",
      redirect_uri: process.env.URL_REDIRECT || "",
      grant_type: "authorization_code",
    }).toString(),
  });

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
};

export default callbackController;
