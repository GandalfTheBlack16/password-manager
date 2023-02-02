import { model, Schema } from 'mongoose';
import IUserEntity from './user-entity.js';

const userSchema = new Schema<IUserEntity>({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

export const User = model<IUserEntity>('User', userSchema);