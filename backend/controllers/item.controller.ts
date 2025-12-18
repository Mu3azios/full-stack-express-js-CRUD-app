import { Request, Response, NextFunction } from 'express';
import { createItem, getItems, getItem, editItem, deleteItem } from '../services/item.service';
import { itemSchema } from '../utils/validation';

export const getAllItemsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await getItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const createItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = itemSchema.parse(req.body);
    const createdItem = await createItem(parsedBody.name, parsedBody.description, parsedBody.price);
    res.status(201).json(createdItem);
  } catch (err) {
    next(err);
  }
};

export const getItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); // Convert id to a number
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' }); // Handle invalid number
    }
    const item = await getItem(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); // Convert id to a number
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' }); // Handle invalid number
    }
    const parsedBody = itemSchema.parse(req.body);
    const updatedItem = await editItem(id, parsedBody.name, parsedBody.description, parsedBody.price);
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};

export const deleteItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); // Convert id to a number
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' }); // Handle invalid number
    }
    const success = await deleteItem(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    next(err);
  }
};