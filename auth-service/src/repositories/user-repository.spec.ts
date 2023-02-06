import { UserModel } from "../models/user-model.js";
import { createUser, findUserByUsername } from "./user-repository.js";

describe('User repository', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('create user should return false if user already exists', async () => {
        const existingUser = { username: 'dummy', password: 'password' }
        const spyGetUser = jest
            .spyOn(UserModel, 'findOne')
            .mockReturnValueOnce(existingUser as any);
        const spySaveUser = jest
            .spyOn(UserModel.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('saved'));
        
        const retValue = await createUser(existingUser);
        expect(spyGetUser).toHaveBeenCalledWith({ username: 'dummy' });
        expect(spySaveUser).toHaveBeenCalledTimes(0);
        expect(retValue).toBeFalsy();
    });

    it('create user should return true if user does not exists', async () => {
        const userToCreate = { username: 'dummy', password: 'password' }
        const spyGetUser = jest
            .spyOn(UserModel, 'findOne')
            .mockReturnValueOnce(null);
        const spySaveUser = jest
            .spyOn(UserModel.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve('saved'));

        const retValue = await createUser(userToCreate);
        expect(spyGetUser).toHaveBeenCalledWith({ username: 'dummy' });
        expect(spySaveUser).toHaveBeenCalledTimes(1);
        expect(retValue).toBeTruthy();
    });

    it('findUserByUsername should return null if user does not exists', async () => {
        const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(null);

        const retValue = await findUserByUsername('dummy');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ username: 'dummy' });
        expect(retValue).toBe(null)
    });

    it('findUserByUsername should return expected user', async () => {
        const expected = { username: 'dummy', password: 'password' }
        const spy = jest.spyOn(UserModel, 'findOne').mockReturnValue(expected as any);

        const retValue = await findUserByUsername('dummy');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ username: 'dummy' });
        expect(retValue).toBe(expected)
    });
});