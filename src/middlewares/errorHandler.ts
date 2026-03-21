import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware global de tratamento de erros.
 * Deve ser registrado como último middleware no server.ts.
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    console.error('❌ Erro:', err.message);
    res.status(500).json({ error: err.message ?? 'Internal Server Error' });
}
