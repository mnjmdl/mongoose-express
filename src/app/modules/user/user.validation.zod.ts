import { z } from 'zod';

const fullNameSchemaZod = z.object({
  firstName: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .max(10, 'Must be 100 or less characters long')
    .regex(new RegExp(/^[A-Z]/), 'Name should be Capitalized'),
  lastName: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .max(100),
});

const addressSchemaZod = z.object({
  street: z
    .string({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .max(200),
  city: z
    .string({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .max(200),
  country: z
    .string({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .max(200),
});

const userSchemaZod = z.object({
  userId: z.number({}),
  username: z
    .string({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .max(100),
  password: z.string(),
  fullName: fullNameSchemaZod,
  age: z.number(),
  email: z
    .string({
      required_error: 'Value is required',
    })
    .trim()
    .email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchemaZod,
});

export default userSchemaZod;
