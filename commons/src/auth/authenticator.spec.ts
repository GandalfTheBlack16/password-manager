import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { validateToken } from "./authenticator.js";

describe('validateJwt', () => {
    
    const payload = { username: 'dummy', role: 'dummy_role' }
    const secret = 'secretInTestingContext';
    
    let token: string;

    beforeEach(() => {
        token = jwt.sign(payload, secret);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should internally call verify function and return a Promise', () => {
        const spy = jest.spyOn(jwt, 'verify');
        const result = validateToken(token, secret);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toBeInstanceOf(Promise)
    });

    it('should throw an error if token is invalid', async () => {
        try {
            await validateToken(token, 'fakeSecret');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(JsonWebTokenError);
            const casted = error as JsonWebTokenError;
            expect(casted.message).toContain('invalid signature');
        }
    });

    it('should return token payload', async () => {
        try {
            const decode = await validateToken(token, secret);
            expect(decode).toBeDefined();
            const casted = decode as JwtPayload;
            const expected = { ...payload, iat: casted.iat }
            expect(casted).toStrictEqual(expected);
        } catch (error) {
            expect(error).toBeUndefined();
        }
    });
});