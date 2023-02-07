import config from "config";
import { AuthStatusEnum } from "../models/responses/auth-status-enum.js";
import UserAuthenticatedResponse from "../models/responses/user-authenticated-response.js";
import UserCreationResponse from "../models/responses/user-creation-response.js";
import { IUser } from "../models/user-model.js";
import { createUser, findUserByUsername } from "../repositories/user-repository.js";
import { compareHash, hashPassowrd, signJwt } from "../util/auth-util.js";


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
    
    const secret = process.env.JWT_SECRET ?? config.get('appConfig.jwt_secret') as string;
    const access_token = await signJwt(user.username, user.password, secret);
    
    return {
        status: AuthStatusEnum.SUCCESS,
        username: user.username,
        access_token
    };
}

export async function signup({
    username,
    password
}: { username: string, password: string }): Promise<UserCreationResponse>{

    try {
        if (await findUserByUsername(username)){
            return {
                status: AuthStatusEnum.ERROR,
                username,
                message: 'User already exists.'
            }
        }
    
        const hashedPassword: string = await hashPassowrd(password);
        if (!await createUser({
            username,
            password: hashedPassword
        })){
            return {
                status: AuthStatusEnum.ERROR,
                username,
                message: 'Unexpected error creating the user.'
            }
        }
    
        return {
            status: AuthStatusEnum.SUCCESS,
            username,
            message: 'User created successfully'
        }
        
    } catch (error) {
        return {
            status: AuthStatusEnum.ERROR,
            username,
            message: `Unexpected error: ${error}`
        }
    }
}

export async function usernameExists(username: string): Promise<boolean> {
    const user: IUser | null = await findUserByUsername(username);
    if (!user){
        return false;
    }
    return true;
}