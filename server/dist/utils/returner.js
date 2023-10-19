"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable  @typescript-eslint/no-explicit-any */
const returner = (res, type, code, result, message) => {
    if (result.length < 1) {
        return res.status(code).json({
            type,
            code,
            message,
        });
    }
    return res.status(code).json({
        type,
        code,
        result,
        message,
    });
};
exports.default = returner;
