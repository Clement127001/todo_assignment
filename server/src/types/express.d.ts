import { AuthPayload } from "../middlewares/authentication.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
