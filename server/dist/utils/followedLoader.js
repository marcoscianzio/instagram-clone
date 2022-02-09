"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const User_1 = require("../entity/User");
exports.followedLoader = () => new dataloader_1.default(async (keys) => {
    console.log(keys);
    const users = await User_1.User.findByIds(keys);
    console.log(users);
});
//# sourceMappingURL=followedLoader.js.map