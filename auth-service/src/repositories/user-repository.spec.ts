import UserEntity from "../models/user-entity.js";
import { UserRepository } from "./user-repository.js"

describe('create user', () => {

    let repository: UserRepository;

    beforeEach(() => {
        repository = new UserRepository();
    });
    
    test('add new user and return true when user does not exist', () => {
        const user = new UserEntity('username', 'password');
        const ret = repository.createUser(user);
        expect(repository.userList.length).toBe(1);
        expect(ret).toBeTruthy();
    });

    test('return false when user already exists', () => {
        const user1 = new UserEntity('username', 'password');
        const user2 = new UserEntity('username', 'another_password');
        repository.createUser(user1);
        const ret = repository.createUser(user2);
        expect(repository.userList.length).toBe(1);
        expect(ret).toBeFalsy();
    });

});

describe('find user by username', () => {

    let repository: UserRepository;

    beforeEach(() => {
        repository = new UserRepository();
    });
    
    test('return user entity if exists one with concrete username', () => {
        const user = new UserEntity('username', 'password');
        repository.createUser(user);
        const candidate = repository.findUserByUsername('username');
        expect(candidate).toBe(user);
    });

    test('return undefined if user with concrete username does not exists', () => {
        const user = new UserEntity('username', 'password');
        const fake = new UserEntity('fake_username', 'fake_password');
        repository.createUser(user);
        const candidate = repository.findUserByUsername('fake_username');
        expect(candidate).toBeUndefined();
    });
})