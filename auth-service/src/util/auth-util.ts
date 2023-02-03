import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassowrd(password: string): Promise<string>{
    return await bcrypt.hash(password, 10);
}

export async function compareHash(hashed: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
}

export async function signJwt(
    username: string, 
    hashedPassword: string, 
    secret: string
) {
    const payload = {
        username,
        password: hashedPassword
    }
    return jwt.sign(payload, secret);
}