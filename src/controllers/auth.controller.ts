import generateCodeVerifier from "../helpers/generateCodeVerifier";

const oAuthController = () => {
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
};
export default oAuthController;
