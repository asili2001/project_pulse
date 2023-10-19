"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const returner_1 = __importDefault(require("../utils/returner"));
const HttpStatusCodes_1 = __importDefault(require("../utils/HttpStatusCodes"));
/**
 * A validator class for the auth controller
 */
class AuthValidator {
    newUser = async (req, res, next) => {
        const body = req.body;
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            personal_number: joi_1.default.string().min(10).max(12).regex(/^\d+$/).required(),
            phone_number: joi_1.default.string().max(20).regex(/^\d+$/).required(),
            email: joi_1.default.string().email().required()
        });
        const { error } = schema.validate(body);
        if (error)
            return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], [...error.details][0].message);
        next();
    };
    loginUser = async (req, res, next) => {
        const body = req.body;
        const schema = joi_1.default.object({
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required()
        });
        const { error } = schema.validate(body);
        if (error)
            return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], [...error.details][0].message);
        next();
    };
    validateToken = async (req, res, next) => {
        const body = req.body;
        const schema = joi_1.default.object({
            token: joi_1.default.string().required(),
        });
        const { error } = schema.validate(body);
        if (error)
            return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], [...error.details][0].message);
        next();
    };
    activateAccount = async (req, res, next) => {
        const body = req.body;
        const schema = joi_1.default.object({
            token: joi_1.default.string().required(),
            password: joi_1.default.string().min(8).required()
        });
        const { error } = schema.validate(body);
        if (error)
            return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], [...error.details][0].message);
        next();
    };
}
exports.default = AuthValidator;
