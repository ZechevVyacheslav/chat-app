import * as express from 'express';
import IUserRequest from '../userModel/IUserRequest';

export default (
  req: IUserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const roleTitle: string = req.roleTitle;
  if (roleTitle === 'Admin' || roleTitle === 'Moderator') {
    return next();
  }
  const error = new Error('Access Denined');
  res.statusCode = 403;
  throw error;
};