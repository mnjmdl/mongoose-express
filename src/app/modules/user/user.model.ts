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
  username: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: [],
  address: addressSchema,
});

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   // obj.password = ;
//   delete obj.password;
//   return obj;
// };

export const User = model<IUser>('User', userSchema);
