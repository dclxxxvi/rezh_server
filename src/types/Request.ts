import { Request } from "express";
import { User } from "src/users/users.model";

export interface IRequest extends Request {
    user?: User;
}