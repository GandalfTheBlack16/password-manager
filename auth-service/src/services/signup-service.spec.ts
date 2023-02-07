import { AuthStatusEnum } from "../models/responses/auth-status-enum.js";
import * as userRepository from "../repositories/user-repository.js";
import * as authUtil from '../util/auth-util.js';
import { signup } from "./signup-service.js";

describe('Signup service', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create user', async () => {
        const expected = {
            status: AuthStatusEnum.SUCCESS,
            username: 'dummy',
            message: 'User created successfully'
        }

        const spyFindUser = jest.spyOn(userRepository, 'findUserByUsername').mockReturnValue(null);
        const spyHashPassword = jest.spyOn(authUtil, 'hashPassowrd').mockResolvedValue('hashed_password');
        const spyCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValue(true);

        const result = await signup({ username: 'dummy', password: 'password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(spyHashPassword).toHaveBeenCalledTimes(1);
        expect(spyHashPassword).toHaveBeenCalledWith('password');
        expect(spyCreateUser).toHaveBeenCalledTimes(1);
        expect(spyCreateUser).toHaveBeenCalledWith({ username: 'dummy', password: 'hashed_password' });
        expect(result).toStrictEqual(expected);
    });

    it('should return error if user already exists', async () => {
        const expected = {
            status: AuthStatusEnum.ERROR,
            username: 'dummy',
            message: 'User already exists.'
        };

        const spyFindUser = jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValue({ username: 'dummy', password: 'password' });

        const result = await signup({ username: 'dummy', password: 'password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(result).toStrictEqual(expected);
    });

    it('should return error if user creation fails', async () => {
        const expected = {
            status: AuthStatusEnum.ERROR,
            username: 'dummy',
            message: 'Unexpected error creating the user.'
        }

        const spyFindUser = jest.spyOn(userRepository, 'findUserByUsername').mockReturnValue(null);
        const spyHashPassword = jest.spyOn(authUtil, 'hashPassowrd').mockResolvedValue('hashed_password');
        const spyCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValue(false);

        const result = await signup({ username: 'dummy', password: 'password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(spyHashPassword).toHaveBeenCalledTimes(1);
        expect(spyHashPassword).toHaveBeenCalledWith('password');
        expect(spyCreateUser).toHaveBeenCalledTimes(1);
        expect(spyCreateUser).toHaveBeenCalledWith({ username: 'dummy', password: 'hashed_password' });
        expect(result).toStrictEqual(expected);
    });
    
    it('should return error on exception thrown', async () => {
        const expected = {
            status: AuthStatusEnum.ERROR,
            username: 'dummy',
            message: `Unexpected error: Fake error`
        };

        const spyFindUser = jest.spyOn(userRepository, 'findUserByUsername').mockImplementationOnce(() => Promise.reject('Fake error'));

        const result = await signup({ username: 'dummy', password: 'password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(result).toStrictEqual(expected);
    });

});