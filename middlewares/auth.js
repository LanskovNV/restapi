const passport = require('passport');
const Boom = require('boom');
const { authMsg } = require('../utils/messages');

function getAuthMiddleware(strategyName) {
    const options = { session: false };

    return (req, res, next) => {
        passport.authenticate(strategyName, options,function(err, user) {
            if (err) { return next(err); }
            if (!user) { return res.json(Boom.unauthorized(authMsg.INVALID_TOKEN)); }
            next();
        })(req, res, next);
    };
}

module.exports = getAuthMiddleware;