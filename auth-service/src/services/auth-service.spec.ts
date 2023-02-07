import { AuthStatusEnum } from "../models/responses/auth-status-enum.js";
import * as userRepository from '../repositories/user-repository.js';
import * as authUtil from '../util/auth-util.js';
import { login, signup, usernameExists } from "./auth-service.js";

describe('Login use case', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('should login an user', async () => {
        const expected = {
            status: AuthStatusEnum.SUCCESS,
            username: 'dummy',
            access_token: 'dummy_token'
        };

        const spyFindUser = jest
            .spyOn(userRepository, 'findUserByUsername')
            .mockResolvedValue({ username: 'dummy', password: 'dummy_hashed_password' });
        const spyCompareHash = jest
            .spyOn(authUtil, 'compareHash')
            .mockResolvedValue(true);
        const spySignJwt = jest
            .spyOn(authUtil, 'signJwt')
            .mockResolvedValue('dummy_token');

        process.env.JWT_SECRET = 'secret';

        const result = await login({ username: 'dummy', password: 'input_password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(spyCompareHash).toHaveBeenCalledTimes(1);
        expect(spyCompareHash).toHaveBeenCalledWith('dummy_hashed_password', 'input_password');
        expect(spySignJwt).toHaveBeenCalledTimes(1);
        expect(spySignJwt).toHaveBeenCalledWith('dummy', 'dummy_hashed_password', 'secret');
        expect(result).toStrictEqual(expected);
    });

    it('should return error if user does not exists', async () => {
        const expected =  { 
            status: AuthStatusEnum.ERROR,
            username: 'dummy'
        };

        const spyFindUser = jest
            .spyOn(userRepository, 'findUserByUsername')
            .mockResolvedValue(null);

        const result = await login({ username: 'dummy', password: 'input_password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(result).toStrictEqual(expected);
    });

    it('should return error if passwords dont match', async () => {
        const expected =  { 
            status: AuthStatusEnum.ERROR,
            username: 'dummy'
        };

        const spyFindUser = jest
            .spyOn(userRepository, 'findUserByUsername')
            .mockResolvedValue({ username: 'dummy', password: 'dummy_hashed_password' });
        const spyCompareHash = jest
            .spyOn(authUtil, 'compareHash')
            .mockResolvedValue(false);

        const result = await login({ username: 'dummy', password: 'fake_password' });
        expect(spyFindUser).toHaveBeenCalledTimes(1);
        expect(spyFindUser).toHaveBeenCalledWith('dummy');
        expect(spyCompareHash).toHaveBeenCalledTimes(1);
        expect(spyCompareHash).toHaveBeenCalledWith('dummy_hashed_password', 'fake_password');
        expect(result).toStrictEqual(expected);
    });
});

describe('Signup use case', () => {

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

    it('should return true if user with given username already exists', async () => {
        const spy = jest.spyOn(userRepository, 'findUserByUsername')
            .mockResolvedValue({ username: 'dummy', password: 'fake' });
        const result = await usernameExists('dummy');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('dummy');
        expect(result).toBeTruthy();
    });

    it('should return false if none user has given username', async () => {
        const spy = jest.spyOn(userRepository, 'findUserByUsername')
            .mockResolvedValue(null);
        const result = await usernameExists('dummy');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('dummy');
        expect(result).toBeFalsy();
    });
});