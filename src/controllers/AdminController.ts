import IUserRequest from '../userModel/IUserRequest';
import { Response } from 'express';

import Role from 'models/domain/core/Role';
import IRoleService from 'models/services/interfaces/IRoleService';

export default class AdminController {
    private roleService: IRoleService;

    constructor(roleService: IRoleService) {
        this.roleService = roleService;
    }

    createRole = async (req: IUserRequest, res: Response) => {

    }

    assignAdminRole = async (req: IUserRequest, res: Response) => {

    }

    assignModeratorRole = async (req: IUserRequest, res: Response) => {

    }

    assignUserRole = async (req: IUserRequest, res: Response) => {

    }
}