// Path: server/src/middleware/error-handler.ts
const chalk = require("chalk");
const { NextFunction, Request, Response } = require('express');
const { ErrorCode, ErrorMessage, HttpStatusCode } = require('../../helper/http-status-code/http-status-code');


// Class to handle the error from the API
// Path: server/src/helper/api-response.ts
export default class ErrorHandler {
    public static handleError(err: any, res: any) {
        console.log("❤️‍🔥", chalk.red("[ErrorHandler]"), "code:", err);

        const status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
        const errorCode = err.errorCode || ErrorCode(status);
        const message = err.message || ErrorMessage[errorCode] || ErrorMessage.INTERNAL_SERVER_ERROR;
        const error = err.error;

        res.status(status).json({
            status,
            errorCode,
            message,
            error,
        });
    }
}