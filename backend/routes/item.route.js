import { Router } from 'express';
import { getAllItems, getSingleItem, createNewItem, updateItem, deleteExistingItem } from '../controllers/item.controller.js';

const router = Router();

router.get('/items', getAllItems);
router.get('/item/:id', getSingleItem);
router.post('/items', createNewItem);
router.put('/item/:id', updateItem);
router.delete('/item/:id', deleteExistingItem);

export default router;  