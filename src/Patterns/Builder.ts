import AdminController from '../controllers/AdminController';
import AuthController from '../controllers/AuthController';
import RoomsController from '../controllers/RoomsController';
import IUserRequest from '../userModel/IUserRequest';
import { Response, Router } from 'express';
import { ValidationChain } from 'express-validator';

type fuctionType = (req: IUserRequest, res: Response) => Promise<Response>;

export default interface Builder {
  buildRouteWithGet(
    path: string,
    controllerFunction: fuctionType,
    validations?: ValidationChain,
    middlewares?: Array<any>
  ): void;
  buildRouteWithPost(
    path: string,
    controllerFunction: fuctionType,
    validations?: ValidationChain,
    middlewares?: Array<any>
  ): void;
  buildRouteWithPut(
    path: string,
    controllerFunction: fuctionType,
    validations?: ValidationChain,
    middlewares?: Array<any>
  ): void;
  buildRouteWithPatch(
    path: string,
    controllerFunction: fuctionType,
    validations?: ValidationChain,
    middlewares?: Array<any>
  ): void;
  buildRouteWithDelete(
    path: string,
    controllerFunction: fuctionType,
    validations?: ValidationChain,
    middlewares?: Array<any>
  ): void;
  buildAdminController(): Promise<AdminController>;
  buildAuthController(): Promise<AuthController>;
  buildRoomsController(): Promise<RoomsController>;
}
