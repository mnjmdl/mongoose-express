"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = exports.maxDuration = void 0;
const user_services_1 = require("./user.services");
const user_validation_zod_1 = __importDefault(require("./user.validation.zod"));
const user_model_1 = require("./user.model");
const zod_validation_error_1 = require("zod-validation-error");
exports.maxDuration = 300;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // data validation using zod
        const userValidateData = user_validation_zod_1.default.parse(userData);
        // const result = await UserServices.createUserIntoDB(userData);
        const result = yield user_services_1.UserServices.createUserIntoDB(userValidateData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        if (err.name == 'ZodError') {
            // res.status(500).json({
            //   success: false,
            //   message: err.issues[0].message || `Something wrong.`,
            //   error: err.issues[0],
            // });
            const validationError = (0, zod_validation_error_1.fromZodError)(err);
            res.status(500).json({
                success: false,
                message: validationError.details[0].message || `Something wrong.`,
                error: validationError.details[0],
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || `Something wrong.`,
                error: err,
            });
        }
    }
});
// Get All User
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// Get One User By ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield user_services_1.UserServices.getUserById(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// Update One User
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: id } = req.params;
    try {
        const user = req.body;
        const result = yield user_services_1.UserServices.updateOneUser(id, user);
        res.status(200).json({
            success: true,
            message: 'User Update successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// deleteUserFromDB
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield user_services_1.UserServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: `User deleted successfully!`,
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// Update Orders
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: id } = req.params;
    try {
        const order = req.body;
        const result = yield user_services_1.UserServices.updateOrder(id, order);
        res.status(200).json({
            success: true,
            message: `Order Update successfully!`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// /:userId/orders
const getAllOrderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: id } = req.params;
    if (yield user_model_1.User.isExists(Number(id))) {
        try {
            const orders = yield user_services_1.UserServices.getAllOrderByUserId(id);
            res.status(200).json({
                success: true,
                message: `Order fetched successfully!`,
                data: orders,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: 'Orders not found',
                error: {
                    code: 404,
                    description: 'Orders not found!',
                },
            });
        }
    }
    else {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getTotalPriceByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: id } = req.params;
    try {
        const totalPrice = yield user_services_1.UserServices.getTotalPriceByUserId(id);
        res.status(200).json({
            success: true,
            message: `Order Price fetched successfully!`,
            data: { totalPrice: totalPrice },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Orders not found',
            error: {
                code: 404,
                description: 'Orders not found!',
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getUsers,
    getUserById,
    updateOneUser,
    deleteUserById,
    updateOrder,
    getAllOrderByUserId,
    getTotalPriceByUserId,
};
