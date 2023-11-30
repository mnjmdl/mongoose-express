"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameSchemaZod = zod_1.z.object({
    firstName: zod_1.z
        .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    })
        .trim()
        .max(10, 'Must be 10 or less characters long')
        .regex(new RegExp(/^[A-Z]/), 'Name should be Capitalized'),
    lastName: zod_1.z
        .string({
        invalid_type_error: 'Name must be a string',
    })
        .trim()
        .max(15, 'Max 15 characters allow'),
});
const addressSchemaZod = zod_1.z.object({
    street: zod_1.z
        .string({
        required_error: 'Street is required',
        invalid_type_error: 'Street must be a string',
    })
        .trim()
        .max(20, 'Max 20 characters allow'),
    city: zod_1.z
        .string({
        required_error: 'City is required',
        invalid_type_error: 'City must be a string',
    })
        .trim()
        .max(20, 'Max 20 characters allow'),
    country: zod_1.z
        .string({
        required_error: 'Country is required',
        invalid_type_error: 'Country must be a string',
    })
        .trim()
        .max(20, 'Max 20 characters allow'),
});
const orderorderSchemaZod = zod_1.z.object({
    productName: zod_1.z.string().trim(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userSchemaZod = zod_1.z.object({
    userId: zod_1.z
        .number({
        required_error: 'UserId is required',
        invalid_type_error: 'UserID must be number',
    })
        .positive(),
    username: zod_1.z
        .string({
        required_error: 'User Name is required',
        invalid_type_error: 'User Name must be a string',
    })
        .trim()
        .max(20, 'Max 20 characters allow'),
    password: zod_1.z.string().max(30),
    fullName: fullNameSchemaZod,
    age: zod_1.z
        .number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be number',
    })
        .positive(),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string and email formate',
    })
        .trim()
        .email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchemaZod,
    orders: zod_1.z.array(orderorderSchemaZod).optional(),
});
exports.default = userSchemaZod;
