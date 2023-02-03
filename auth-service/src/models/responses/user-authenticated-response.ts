import { AuthStatusEnum } from "./auth-status-enum.js";

export default interface UserAuthenticatedResponse {
    status: AuthStatusEnum;
    username: string;
    access_token?: string;
}