import { AuthStatusEnum } from "./auth-status-enum.js";

export default interface UserCreationResponse {
    status: AuthStatusEnum;
    username: string;
    message: string;
}

