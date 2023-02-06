import { hashPassowrd, compareHash, signJwt } from "./auth-util.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Auth utils', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('hashPassowrd should throw an error if SALT_ROUNDS is not defined', async () => {
        try {
            await hashPassowrd('dummy');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it ('hashPassword should return an expected hash', async () => {
        const bcryptGenSalt = jest.spyOn(bcrypt, 'genSalt').mockReturnValue('salt' as any);
        const bcryptHash = jest.spyOn(bcrypt, 'hash').mockReturnValue('expected' as any);
        process.env.SALT_ROUNDS = '1';

        const hashedPassword = await hashPassowrd('dummy');
        expect(bcryptGenSalt).toHaveBeenCalledTimes(1);
        expect(bcryptHash).toHaveBeenCalledTimes(1);
        expect(hashedPassword).toBe('expected');
    });

    it('compareHash should return true', async () => {
        const spy = jest.spyOn(bcrypt, 'compare').mockReturnValue(true as any);
        process.env.SALT_ROUNDS = '1';
        const result = await compareHash('password', 'hash');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('hash', 'password');
        expect(result).toBeTruthy();
    });

    it('compareHash should return false', async () => {
        const spy = jest.spyOn(bcrypt, 'compare').mockReturnValue(false as any);
        process.env.SALT_ROUNDS = '1';
        const result = await compareHash('password', 'fake_hash');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('fake_hash', 'password');
        expect(result).toBeFalsy();
    });

    it('signJwt should return a valid token', async () => {
        const secret = 'dummy_secret';
        const payload = { username: 'dummy', password: 'dummy_hashed_password' }
        const spy = jest.spyOn(jwt, 'sign');
        const result = await signJwt('dummy', 'dummy_hashed_password', secret);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(payload, secret);
        expect(result).toBeDefined();

        const decoded = await jwt.verify(result, secret) as any;
        expect(decoded.username).toBe(payload.username);
        expect(decoded.username).toBe(payload.username);
    });
}); 