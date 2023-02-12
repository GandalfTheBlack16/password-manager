import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export const validateToken = (
    token: string,
    secret: string
): Promise<string | JwtPayload | undefined> => {
    return new Promise((
        resolve: (reason?: string | JwtPayload) => void, 
        reject: (reason?: VerifyErrors) => void) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err){
                    reject(err);
                }
                resolve(decoded);
            });
        });
}

export const refreshJwt = () => {
    throw Error(
        'Not implemented'
    )
}