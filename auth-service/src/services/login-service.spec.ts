import { AuthStatusEnum } from "../models/responses/auth-status-enum.js";
import { login } from "./login-service.js";
import * as userRepository from '../repositories/user-repository.js';
import * as authUtil from "../util/auth-util.js";

describe('Login service', () => {

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