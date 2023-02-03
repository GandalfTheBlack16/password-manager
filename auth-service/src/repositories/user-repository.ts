import { IUser, UserModel } from "../models/user-model.js";

export async function createUser(user: IUser): Promise<boolean>{
    if (await getUserByUsername(user.username)){
        return false;
    }
    await new UserModel(user).save();
    return true;
}

export async function findUserByUsername(username: string): Promise<IUser | null> {
    return await getUserByUsername(username);
}

async function getUserByUsername(username: string): Promise<IUser | null>{
    return await UserModel.findOne({ username });
}
