import type { Request, Response } from 'express';

export class GameController {
    // POST /game/start
    static async startGame(_req: Request, res: Response): Promise<void> {
        // TODO: chamar GameService.startGame()
        res.status(501).json({ message: 'Not implemented' });
    }

    // POST /game/hit
    static async hit(_req: Request, res: Response): Promise<void> {
        // TODO: chamar GameService.hit()
        res.status(501).json({ message: 'Not implemented' });
    }

    // POST /game/stand
    static async stand(_req: Request, res: Response): Promise<void> {
        // TODO: chamar GameService.stand()
        res.status(501).json({ message: 'Not implemented' });
    }
}
