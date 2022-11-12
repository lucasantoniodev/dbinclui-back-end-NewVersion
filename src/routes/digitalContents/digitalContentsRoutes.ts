import { Request, Response, Router } from 'express';

const digitalContentsRouter = Router();

digitalContentsRouter.get('/', (req: Request, res: Response) => {
    res.send('Rota de digitalContents');
});


export { digitalContentsRouter  };
