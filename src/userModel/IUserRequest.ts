import * as express from 'express'

export default interface IUserRequest extends express.Request {
    userId: number
}