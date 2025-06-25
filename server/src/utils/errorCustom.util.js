class AppError extends Error {
    constructor(message, options = {}) {
        super(message);

        // Lưu thông tin bổ sung tùy chọn
        this.statusCode = options.statusCode || 500;
        this.errorCode = options.errorCode || null;
        this.details = options.details || null;

        // Đánh dấu đây là lỗi xử lý được
        this.isOperational = true;

        // Ghi lại stack trace cho debug
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
