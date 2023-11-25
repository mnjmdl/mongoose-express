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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// Create User
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isExists(Number(user.userId))) {
        throw new Error(`User ID: ${user.userId} already exists`);
    }
    else {
        const newUser = yield user_model_1.User.create(user);
        if (newUser) {
            const result = yield user_model_1.User.findOne({
                userId: { $eq: Number(user.userId) },
            }).select({ _id: 0, password: 0, __v: 0 });
            return result;
        }
    }
});
// Get All User
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().select({
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    if (users.length > 0) {
        return users;
    }
    else
        return 'No User Found';
});
// Get User By ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isExists(Number(id))) {
        const user = yield user_model_1.User.findOne({ userId: { $eq: Number(id) } }).select({
            _id: 0,
            password: 0,
            __v: 0,
        });
        return user;
    }
    else {
        throw new Error(`User ID: ${id} not exists`);
    }
});
// Update User
const updateOneUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    if (yield user_model_1.User.isExists(Number(id))) {
        try {
            const doc = yield user_model_1.User.findOne({ userId: Number(user.userId) });
            console.log(doc);
            if (doc !== null) {
                doc.fullName.firstName = user.fullName.firstName
                    ? user.fullName.firstName
                    : doc.fullName.firstName;
                doc.fullName.lastName = user.fullName.lastName
                    ? user.fullName.lastName
                    : doc.fullName.lastName;
                doc.age = user.age ? user.age : doc.age;
                doc.email = user.email ? user.email : doc.email;
                doc.isActive = user.isActive ? user.isActive : doc.isActive;
                doc.hobbies = user.hobbies ? user.hobbies : doc.hobbies;
                doc.address.street = user.address.street
                    ? user.address.street
                    : doc.address.street;
                doc.address.city = user.address.city
                    ? user.address.city
                    : doc.address.city;
                doc.address.country = user.address.country
                    ? user.address.country
                    : doc.address.country;
                yield (doc === null || doc === void 0 ? void 0 : doc.save());
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    else {
        throw new Error(`User ID: ${user.userId} not exists`);
    }
});
// Delete User
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isExists(Number(id))) {
        const result = user_model_1.User.findOneAndDelete({ userId: Number(id) });
        return result;
    }
    else {
        throw new Error(`User ID: ${id} not exists`);
    }
});
const updateOrder = (id, order) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isExists(Number(id))) {
        yield user_model_1.User.updateOne({ userId: Number(id) }, { $addToSet: { orders: order } })
            .then((result) => {
            return result;
        })
            .catch((err) => {
            return err;
        });
    }
    else {
        throw new Error(`User ID: ${id} not exists`);
    }
});
// get all order by user id
const getAllOrderByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (yield user_model_1.User.isExists(Number(id))) {
        const orders = yield user_model_1.User.findOne({
            userId: { $eq: Number(id) },
        }).select({ orders: 1, _id: 0 });
        // return orders;
        if (((_a = orders === null || orders === void 0 ? void 0 : orders.orders) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return orders;
        }
        else
            return 'No Order Found';
        return;
    }
    else {
        throw new Error(`User ID: ${id} not exists`);
    }
});
// Total Price by user id
const getTotalPriceByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (yield user_model_1.User.isExists(Number(id))) {
        const user = yield user_model_1.User.findOne({
            userId: { $eq: Number(id) },
        }).select({ orders: 1, _id: 0 });
        return (_b = user === null || user === void 0 ? void 0 : user.orders) === null || _b === void 0 ? void 0 : _b.reduce((price, order) => price + order.price * order.quantity, 0);
    }
    else {
        throw new Error(`User ID: ${id} not exists`);
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getUserById,
    updateOneUser,
    deleteUserFromDB,
    updateOrder,
    getAllOrderByUserId,
    getTotalPriceByUserId,
};
