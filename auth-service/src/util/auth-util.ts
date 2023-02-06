import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config'


export async function hashPassowrd(password: string): Promise<string>{
    const saltRounds: string = process.env.SALT_ROUNDS ?? config.get('appConfig.salt_rounds');
    const salt = await bcrypt.genSalt(+saltRounds);
    return await bcrypt.hash(password, salt);
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