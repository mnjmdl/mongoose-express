import { z } from 'zod';

const fullNameSchemaZod = z.object({
  firstName: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .max(10, 'Must be 10 or less characters long')
    .regex(new RegExp(/^[A-Z]/), 'Name should be Capitalized'),
  lastName: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .max(15, 'Max 15 characters allow'),
});

const addressSchemaZod = z.object({
  street: z
    .string({
      required_error: 'Street is required',
      invalid_type_error: 'Street must be a string',
    })
    .trim()
    .max(20, 'Max 20 characters allow'),
  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    })
    .trim()
    .max(20, 'Max 20 characters allow'),
  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    })
    .trim()
    .max(20, 'Max 20 characters allow'),
});

const orderorderSchemaZod = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const userSchemaZod = z.object({
  userId: z
    .number({
      required_error: 'UserId is required',
      invalid_type_error: 'UserID must be number',
    })
    .positive(),
  username: z
    .string({
      required_error: 'User Name is required',
      invalid_type_error: 'User Name must be a string',
    })
    .trim()
    .max(20, 'Max 20 characters allow'),
  password: z.string().max(30),
  fullName: fullNameSchemaZod,
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be number',
    })
    .positive(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string and email formate',
    })
    .trim()
    .email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchemaZod,
  orders: z.array(orderorderSchemaZod).optional(),
});

export default userSchemaZod;
