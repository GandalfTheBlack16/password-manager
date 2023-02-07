import { AuthStatusEnum } from '../models/responses/auth-status-enum.js';
import UserCreationResponse from "../models/responses/user-creation-response.js";
import { createUser, findUserByUsername } from "../repositories/user-repository.js";
import { hashPassowrd } from '../util/auth-util.js';

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