import type { DataResponseUser } from "./src/types/dataResponse";
import { TLS_CONFIG } from "./src/tls";
import routes from "./src/routes";

const server = Bun.serve({
  port: process.env.PORT,
  routes,
  // @ts-expect-error: error expected
  tls: TLS_CONFIG,
});

console.log(`running in ${server.port}`);
