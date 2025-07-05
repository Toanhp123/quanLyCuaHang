const ProfileService = require('../services/profile.service');

class profileController {
    // [GET] /profile/:username
    async getProfile(req, res, next) {
        const { id } = req.params;

        try {
            const profile = await ProfileService.getProfile(id);

            res.status(200).json(profile);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new profileController();
