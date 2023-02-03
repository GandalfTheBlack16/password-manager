import { AuthStatusEnum } from "../models/responses/auth-status-enum.js";
import UserAuthenticatedResponse from "../models/responses/user-authenticated-response.js";
import { findUserByUsername } from "../repositories/user-repository.js";
import { compareHash, signJwt } from "../util/auth-util.js";


export async function login({
    username,
    password
}: { username: string, password: string }): Promise<UserAuthenticatedResponse> {
    
    const user = await findUserByUsername(username);
    const authError: UserAuthenticatedResponse = { 
        status: AuthStatusEnum.ERROR,
        username
    }
    if (!user){
        return authError;
    }

    if (!await compareHash(user.password, password)){
        return authError;
    }

    const access_token = await signJwt(user.username, user.password, '_secret');
    
    return {
        status: AuthStatusEnum.SUCCESS,
        username: user.username,
        access_token
    };
}