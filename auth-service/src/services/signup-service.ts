import bcrypt from 'bcrypt';
import UserCreationResult, { StatusEnum } from "../models/messages/user-creation-result.js";
import { createUser, findUserByUsername } from "../repositories/user-repository.js";

//TODO: move this to env config
const saltRounds: number = 10;

export async function signup({
    username,
    password
}: { username: string, password: string }): Promise<UserCreationResult>{

    if (await findUserByUsername(username)){
        return {
            status: StatusEnum.ERROR,
            username,
            message: 'User already exists.'
        }
    }

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    if (!createUser({
        username,
        password: hashedPassword
    })){
        return {
            status: StatusEnum.ERROR,
            username,
            message: 'Unexpected error.'
        }
    }

    return {
        status: StatusEnum.SUCCESS,
        username,
        message: 'User created successfully'
    }
}