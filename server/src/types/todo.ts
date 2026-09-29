import { AuthPayload } from "../middlewares/authentication.js";

export interface RequestWithUserDetails extends Request {
  user: AuthPayload;
}
export type requestParams = string | string[] | undefined;
