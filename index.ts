import type { DataResponseUser } from "./src/types/dataResponse";
import { TLS_CONFIG } from "./src/tls";
import routes from "./src/routes";
import logger from "./src/logger";

const server = Bun.serve({
  port: process.env.PORT,
  routes,
  // @ts-expect-error: error expected
  tls: TLS_CONFIG,
});

logger.success("Server started successfully");
logger.url(`https://localhost:${server.port}`);
