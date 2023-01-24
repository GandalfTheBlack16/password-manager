import bcrypt from 'bcrypt';
import UserCreationResult, { StatusEnum } from "../models/user-creation-result.js";
import UserEntity from '../models/user-entity.js';
import { UserRepository } from "../repositories/user-repository.js";

const repository: UserRepository = new UserRepository();
//TODO: move this to env config
const saltRounds: number = 10;

export async function signup({
    username,
    password
}: { username: string, password: string }): Promise<UserCreationResult>{

    if (repository.findUserByUsername(username)){
        return {
            status: StatusEnum.ERROR,
            username,
            message: 'User already exists.'
        }
    }

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const user: UserEntity = new UserEntity(username, hashedPassword);
    if (!repository.createUser(user)){
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