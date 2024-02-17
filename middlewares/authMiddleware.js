import jwt from 'jsonwebtoken';
import { UserAuth } from '../models/UserAuth.js';

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization']
        const token = authorization && (authorization.split(' ')[0] === "Bearer" ? authorization.split(' ')[1] : authorization.split(' ')[0])
        if (!token) res.status(401).send("Unauthenticated")

        const user = await UserAuth.findOne({})
        req.user = user

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', error });
    }
};

const authoMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token not provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY);
        console.log(decoded.userId);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        const user = await UserAuth.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        req.user = user;
        if (req.params.name !== decoded.userId) {
            return res.status(403).json({ error: 'Unauthorized. You are not allowed to perform this action.' });
        }

        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { authMiddleware, authoMiddleware };