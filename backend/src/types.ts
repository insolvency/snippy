import { Request } from "express";

export interface JwtBody {
    sub: string;
    iat?: number;
    exp?: number;
}

export interface AuthenticatedRequest extends Request {
    user: JwtBody;
}

export interface NamedFile {
    name: string;
    file: Express.Multer.File;
}