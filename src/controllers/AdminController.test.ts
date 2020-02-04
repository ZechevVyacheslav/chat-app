// import IUserRequest from '../userModel/IUserRequest';

// import RoleService from '../models/infrastructure/serviceImpl/RoleService';
// import UserService from '../models/infrastructure/serviceImpl/UserService';
// import AdminController from './AdminController';
// import User from '../models/domain/core/User';
// import Role from '../models/domain/core/Role';
// jest.mock('../models/infrastructure/serviceImpl/UserService');
// jest.mock('../models/infrastructure/serviceImpl/RoleService');
// import { when } from 'jest-when';

// let userRepository = {} as any;
// let roleRepository = {} as any;
// let userService = new UserService(userRepository) as any;
// let roleService = new RoleService(roleRepository) as any;
// let adminController = new AdminController(roleService, userService);

// let req;
// let res;

// beforeEach(() => {
//   res = {
//     statusCode: 200,
//     status: jest.fn().mockImplementation(code => {
//       res.statusCode = code;
//       return res;
//     }),
//     json: jest.fn()
//   } as any;

//   req = {
//     body: {}
//   } as any;

//   jest.clearAllMocks();
// });

// const userRole = new Role();
// userRole.id = 1;
// userRole.title = 'User';

// const moderRole = new Role();
// moderRole.id = 2;
// moderRole.title = 'Moderator';

// const adminRole = new Role();
// adminRole.id = 3;
// adminRole.title = 'Admin';

// describe('Testing admin controller', () => {
//   describe('Adding new role', () => {
//     it('Creating user role', async () => {
//       req.body = {
//         title: 'User'
//       };

//       const role = new Role();
//       role.title = req.body.title;

//       when(roleService.addRole).calledWith(role).mockReturnValue(Promise.resolve(userRole));

//       await adminController.createRole(req, res);

//       expect(roleService.addRole).toHaveBeenCalledWith(role);
//       expect(roleService.addRole).toReturn();
//       expect(res.statusCode).toEqual(201);
//     });
//   });
// });
