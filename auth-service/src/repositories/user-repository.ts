import UserEntity from "../models/user-entity.js";

export class UserRepository {
    
    private _userList: UserEntity[] = [];

    createUser(user: UserEntity): boolean{
        if (this.getUserByUsername(user.username)){
            return false;
        }
        this._userList.push(user);
        return true;
    }

    findUserByUsername(username: string): UserEntity | undefined {
        return this.getUserByUsername(username);
    }

    private getUserByUsername(username: string): UserEntity | undefined{
        return this._userList.find(i => i.username === username);
    }
    
    public get userList(): UserEntity[]{
        return this._userList;
    }
}
