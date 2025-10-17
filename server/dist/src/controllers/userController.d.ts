import type { Request, Response } from "express";
/**
 * @desc Get all users
 */
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
/**
 * @desc Get a single user by cognitoId
 * @route GET /api/users/:cognitoId
 */
export declare const getUser: (req: Request<{
    cognitoId: string;
}>, res: Response) => Promise<void>;
/**
 * @desc Create a new user
 * @route POST /api/users
 */
export declare const postUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map