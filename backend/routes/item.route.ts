import { Router, Request, Response } from 'express';
import { getAllItemsController, getItemController, createItemController, updateItemController, deleteItemController } from '../controllers/item.controller';

const router = Router();

router.get('/items', (req: Request, res: Response) => getAllItemsController(req, res));
router.get('/item/:id', (req: Request, res: Response) => getItemController(req, res));
router.post('/items', (req: Request, res: Response) => createItemController(req, res));
router.put('/item/:id', (req: Request, res: Response) => updateItemController(req, res));
router.delete('/item/:id', (req: Request, res: Response) => deleteItemController(req, res));

export default router;