import type { Request, Response } from 'express';

export class UserController {
    // POST /users
    static async create(_req: Request, res: Response): Promise<void> {
        // TODO: chamar UserService.create()
        res.status(501).json({ message: 'Not implemented' });
    }

    // GET /users/:id
    static async getById(_req: Request, res: Response): Promise<void> {
        // TODO: chamar UserService.findById()
        res.status(501).json({ message: 'Not implemented' });
    }
}
