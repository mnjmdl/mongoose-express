import { Schema, model } from 'mongoose';
import { Address, FullName, IUser } from './user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String },
  lastName: { type: String },
});

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [] },
  address: addressSchema,
});

export const User = model<IUser>('User', userSchema);
