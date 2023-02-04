import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config'


export async function hashPassowrd(password: string): Promise<string>{
    const saltRounds = process.env.SALT_ROUNDS ?? config.get('appConfig.salt_rounds') as number;
    return await bcrypt.hash(password, saltRounds);
}

export async function compareHash(hashed: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
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