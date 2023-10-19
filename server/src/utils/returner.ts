import { Response } from 'express';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const returner = (
    res: Response,
    type: string,
    code: number,
    result: any[],
    message: string
) => {
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

export default returner;
