// import * as bcrypt from 'bcryptjs';
// import UserService from '../models/infrastructure/serviceImpl/UserService';
// import RoleService from '../models/infrastructure/serviceImpl/RoleService';
// import AuthController from './AuthController';
// import User from '../models/domain/core/User';
// import Role from '../models/domain/core/Role';
// jest.mock('../models/infrastructure/serviceImpl/UserService');
// jest.mock('../models/infrastructure/serviceImpl/RoleService');
// import { when } from 'jest-when';

// let userRepository = {} as any;
// let roleRepository = {} as any;
// let userService = new UserService(userRepository) as any;
// let roleService = new RoleService(roleRepository) as any;
// let authController = new AuthController(userService, roleService) as any;

// let req;
// let res;

// beforeEach(() => {
//   res = {
//     statusCode: 200,
//     redirect: jest.fn().mockImplementation(path => {
//       res.statusCode = 302;
//       return res;
//     }),
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

// when(roleService.findRoleByTitle)
//   .calledWith('User')
//   .mockReturnValue(Promise.resolve(userRole));

// const regiseredUser = new User();
// regiseredUser.id = 1;
// regiseredUser.email = 'test@gmail.com';
// regiseredUser.username = 'Slava';
// regiseredUser.password = '12345';
// regiseredUser.role = userRole;

// const newUser = new User();
// newUser.email = 'test2@gmail.com';
// newUser.username = 'Vyacheslav';
// newUser.password = '654321';

// when(userService.getUserByEmail)
//   .calledWith(regiseredUser.email)
//   .mockReturnValue(Promise.resolve(regiseredUser));

// when(userService.getUserByUsername)
//   .calledWith(regiseredUser.username)
//   .mockReturnValue(Promise.resolve(regiseredUser));

// when(userService.registerUser)
//   .calledWith(newUser.email, newUser.username, newUser.password, userRole)
//   .mockReturnValue(Promise.resolve(newUser));

// describe('Testing auth controller', () => {
//   describe('Registration process', () => {
//     it('With new user', async () => {
//       req.body = {
//         email: newUser.email,
//         username: newUser.username,
//         password: newUser.password
//       };

//       await authController.register(req, res);

//       expect(roleService.findRoleByTitle).toHaveBeenCalledWith('User');
//       expect(userService.getUserByEmail).toHaveBeenCalledWith(req.body.email);
//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.registerUser).toBeCalledTimes(1);
//       expect(res.statusCode).toEqual(201);
//     });

//     it('With exising email', async () => {
//       req.body = {
//         email: regiseredUser.email,
//         username: newUser.username,
//         password: newUser.password
//       };

//       await authController.register(req, res);

//       expect(userService.getUserByEmail).toHaveBeenCalledWith(req.body.email);
//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.registerUser).toBeCalledTimes(0);
//       expect(res.statusCode).toEqual(409);
//     });

//     it('With exising username', async () => {
//       req.body = {
//         email: newUser.email,
//         username: regiseredUser.username,
//         password: newUser.password
//       };

//       await authController.register(req, res);

//       expect(userService.getUserByEmail).toHaveBeenCalledWith(req.body.email);
//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.registerUser).toBeCalledTimes(0);
//       expect(res.statusCode).toEqual(409);
//     });

//     it('With exising email and username', async () => {
//       req.body = {
//         email: regiseredUser.email,
//         username: regiseredUser.username,
//         password: newUser.password
//       };

//       await authController.register(req, res);

//       expect(userService.getUserByEmail).toHaveBeenCalledWith(req.body.email);
//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.registerUser).toBeCalledTimes(0);
//       expect(res.statusCode).toEqual(409);
//     });
//   });

//   describe('Login process', () => {
//     it('With valid fields', async () => {
//       req.body = {
//         username: regiseredUser.username,
//         password: regiseredUser.password
//       };

//       const hashedPassword = await bcrypt.hash(regiseredUser.password, 12);
//       regiseredUser.password = hashedPassword;

//       await authController.login(req, res);

//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.getUserByUsername).toReturn();
//       expect(res.statusCode).toEqual(200);
//     });

//     it('With not existing username', async () => {
//       req.body = {
//         username: 'Random',
//         password: regiseredUser.password
//       };

//       const hashedPassword = await bcrypt.hash(regiseredUser.password, 12);
//       regiseredUser.password = hashedPassword;

//       await authController.login(req, res);

//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.getUserByUsername).toReturn();
//       expect(res.statusCode).toEqual(401);
//     });

//     it('With invalid password', async () => {
//       req.body = {
//         username: regiseredUser.username,
//         password: 'Random'
//       };

//       const hashedPassword = await bcrypt.hash(regiseredUser.password, 12);
//       regiseredUser.password = hashedPassword;

//       await authController.login(req, res);

//       expect(userService.getUserByUsername).toHaveBeenCalledWith(
//         req.body.username
//       );
//       expect(userService.getUserByUsername).toReturn();
//       expect(res.statusCode).toEqual(401);
//     });
//   });
// });
