import UserEntity from "../models/user-entity.js";
import { User } from "../models/user-model.js";

export async function createUser(user: UserEntity): Promise<boolean>{
    if (await getUserByUsername(user.username)){
        return false;
    }
    await new User(user).save();
    return true;
}

export async function findUserByUsername(username: string): Promise<UserEntity | null> {
    return await getUserByUsername(username);
}

async function getUserByUsername(username: string): Promise<UserEntity | null>{
    return await User.findOne({ username });
}
