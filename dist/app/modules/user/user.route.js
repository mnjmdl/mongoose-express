"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// router.post('/create-user', UserControllers.createUser);
router.post('/', user_controller_1.UserControllers.createUser);
router.get('/', user_controller_1.UserControllers.getUsers);
router.get('/:userId', user_controller_1.UserControllers.getUserById);
router.put('/:userId', user_controller_1.UserControllers.updateOneUser);
router.delete('/:userId', user_controller_1.UserControllers.deleteUserById);
router.put('/:userId/orders', user_controller_1.UserControllers.updateOrder);
router.get('/:userId/orders', user_controller_1.UserControllers.getAllOrderByUserId);
router.get('/:userId/orders/total-price', user_controller_1.UserControllers.getTotalPriceByUserId);
exports.UserRoutes = router;
