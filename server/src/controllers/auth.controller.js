const {
    COOKIE_EXPIRES_IN,
    COOKIE_EXPIRES_DAY_IN,
} = require('../configs/env.config');
const { TokenName } = require('../configs/constants.config');
const { createCookie, deleteCookie } = require('../utils/cookie.util');

const authService = require('../services/auth.service');

class AuthController {
    // [POST] /auth/login
    async login(req, res, next) {
        const { username, password } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        try {
            // Lấy thông tin người dùng nếu đăng nhập thành công
            const payload = await authService.login(username, password);

            // Tạo 2 Cookie chứa Access Token và Refresh Token trả về client
            createCookie(
                res,
                TokenName.ACCESS,
                payload.accessToken,
                false,
                COOKIE_EXPIRES_IN,
            );
            createCookie(
                res,
                TokenName.REFRESH,
                payload.refreshToken,
                true,
                COOKIE_EXPIRES_DAY_IN,
            );

            // Tạo session log cho người dùng
            await authService.createSessionLog(payload.user.id, ip);

            res.status(200).json({ message: 'Login success' });
        } catch (err) {
            next(err);
        }
    }

    // [POST] /auth/logout
    async logout(req, res, next) {
        const id = req.user.id;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        try {
            await authService.logout(id, ip);

            // Xóa 2 cookie khi đăng xuất
            deleteCookie(res, TokenName.ACCESS);
            deleteCookie(res, TokenName.REFRESH);

            res.status(200).json({ message: 'Logout success' });
        } catch (err) {
            next(err);
        }
    }

    // [POST] /auth/register
    async register(req, res, next) {
        const user = req.user;

        try {
            // Tạo tài khoản mới
            await authService.register(user);

            res.status(201).json({ message: 'Register success' });
        } catch (err) {
            next(err);
        }
    }

    // [POST] /auth/refresh-token
    async getNewAccessToken(req, res, next) {
        const refreshToken = {
            payload: req.user,
        };
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        try {
            // Tạo Access Token từ Refresh Token nếu hợp lệ
            const newAccessToken = await authService.refreshTokenHandler(
                refreshToken.payload,
                ip,
            );

            // Tạo 1 Cookie chứa Access Token trả về client
            createCookie(
                res,
                TokenName.ACCESS,
                newAccessToken,
                false,
                COOKIE_EXPIRES_IN,
            );

            res.status(200).json({ message: 'Create Access Token success' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
