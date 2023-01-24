import UserEntity from "../models/user-entity.js";

export class UserRepository {
    
    private userList: UserEntity[] = [];

    createUser(user: UserEntity): boolean{
        if (this.getUserByUsername(user.username)){
            return false;
        }
        this.userList.push(user);
        return true;
    }

    findUserByUsername(username: string): UserEntity | undefined {
        return this.getUserByUsername(username);
    }

    private getUserByUsername(username: string): UserEntity | undefined{
        return this.userList.find(i => i.username === username);
    }
}
