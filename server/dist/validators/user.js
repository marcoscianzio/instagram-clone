"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const user = {
    username: yup
        .string()
        .required("This field is required")
        .min(2, "Min of 2 characters"),
    password: yup
        .string()
        .required("This field is required")
        .min(2, "Min of 2 characters"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("This field is required"),
};
exports.userSchema = yup.object().shape(Object.assign({}, user));
//# sourceMappingURL=user.js.map