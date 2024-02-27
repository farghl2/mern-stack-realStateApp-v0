import appError from "../utils/appError.js";
import { ERROR } from '../utils/httpResStatusText.js'

import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        const error = appError.create(401, ERROR, 'unAuthorization');
        return next(error);
    }
    try {

        const decoded = Jwt.verify(token, process.env.SCT_TOKEN);
        req.user = decoded;
        return next();
    } catch (error) {
        const errorUnvalied = appError.create(501, ERROR, 'unvalied token');
        return next(errorUnvalied);
    }


}

export default verifyToken;