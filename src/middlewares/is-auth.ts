import * as jwt from 'jsonwebtoken';
import * as express from 'express'
import IUserRequest from './IUserRequest'

export default (req: IUserRequest, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated");
        res.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "supersecretprivatkey");
    } catch (error) {
        res.statusCode = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated");
        res.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}