import type { BunRequest } from "bun";
import oAuthController from "./controllers/auth.controller";
import callbackController from "./controllers/callback.controller";
import type { DataResponseUser } from "./types/dataResponse";

const routes = {
  "/": () => {
    return new Response("Hello with Bun!");
  },
  "/oauth": oAuthController,
  "/callback": callbackController,
  "/user": (_: BunRequest, res: DataResponseUser) => {
    return Response.json(res.user);
  },
};

export default routes;
