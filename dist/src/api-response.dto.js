'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, message, data) {
        this.success = true;
        this.success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    sendResponse(res) {
        return res.status(this.statusCode).json(this);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api-response.dto.js.map
