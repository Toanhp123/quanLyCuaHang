const ProfileService = require('../services/profile.service');

class profileController {
    // [GET] /profile/:username
    async getProfile(req, res, next) {
        const { id } = req.params;

        try {
            const profile = await ProfileService.getProfile(id);

            if (!profile) {
                return res.status(404).json({
                    message: `Profile not found`,
                });
            }
            
            return res.status(200).json({
                message: `Profile found`,
                data: profile,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new profileController();
