import type { Server } from "bun";

export interface DataResponseUser extends Server {
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
