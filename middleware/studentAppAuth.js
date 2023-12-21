const jwt = require('jsonwebtoken');
const User = require('../models/StudentsModel');
const Helper = require('../config/helper');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) { return Helper.response(res, 401, "You must be logged in") }

            const token = authorization;
            const payload = await jwt.verify(token, JWT_SECRET);

            const { _id } = payload;
            const userdata = await User.findById(_id).lean();

            if (userdata === null) {
                return Helper.response(res, 401, "Token is invalid");
            }
            if (userdata.status === "Inactive") {
                return Helper.response(res, 401, "Your account has been temporarily suspended. Please contact the administrator");
            }
            if (userdata.jwt_token.includes(token)) {
                userdata.jwt_token = [token];
                req.student = userdata;
                next();
            } else {
                return Helper.response(res, 401, "Token is invalid");
            }
        } catch (err) {
            console.error(err);
            return Helper.response(res, 401, "You must be logged in");
        }
    },
};

