import express, { Request, Response } from 'express';
import returner from '../utils/returner';

const router = express.Router();

// server status
router.get('/', (req: Request, res: Response) => {
    return returner(res, 'success', 200, [], 'Server is active');
});

export default router;
