"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { createItem, getAllItems, getItem, updateItem, deleteItem } from '../services/item.service';
// import { itemSchema } from '../utils/validation'; 
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemController = exports.updateItemController = exports.getItemController = exports.createItemController = exports.getAllItemsController = void 0;
const item_service_1 = require("../services/item.service");
const validation_1 = require("../utils/validation");
const getAllItemsController = async (req, res, next) => {
    try {
        const items = await (0, item_service_1.getAllItems)();
        res.status(200).json(items);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllItemsController = getAllItemsController;
const createItemController = async (req, res, next) => {
    try {
        const parsedBody = validation_1.itemSchema.parse(req.body);
        const createdItem = await (0, item_service_1.createItem)(parsedBody);
        res.status(201).json(createdItem);
    }
    catch (err) {
        next(err);
    }
};
exports.createItemController = createItemController;
const getItemController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await (0, item_service_1.getItemById)(Number(id));
        if (!item)
            return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    }
    catch (err) {
        next(err);
    }
};
exports.getItemController = getItemController;
const updateItemController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const parsedBody = validation_1.itemSchema.parse(req.body);
        const updatedItem = await (0, item_service_1.updateItem)(Number(id), parsedBody);
        res.status(200).json(updatedItem);
    }
    catch (err) {
        next(err);
    }
};
exports.updateItemController = updateItemController;
const deleteItemController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const success = await (0, item_service_1.deleteItem)(Number(id));
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.deleteItemController = deleteItemController;
