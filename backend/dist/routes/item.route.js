"use strict";
// import express, { Router } from 'express';
// import { 
//   getAllItemsController, 
//   createItemController, 
//   getItemController, 
//   updateItemController, 
//   deleteItemController 
// } from '../controllers/item.controller.ts';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// const router: Router = express.Router();
// router.get('/', getAllItemsController);
// router.post('/', createItemController);
// router.get('/:id', getItemController);
// router.put('/:id', updateItemController);
// router.delete('/:id', deleteItemController);
// export default router;
//! new code
const express_1 = tslib_1.__importDefault(require("express"));
const item_controller_1 = require("../controllers/item.controller");
const router = express_1.default.Router();
router.get('/', item_controller_1.getAllItemsController);
router.post('/', item_controller_1.createItemController);
router.get('/:id', item_controller_1.getItemController);
router.put('/:id', item_controller_1.updateItemController);
router.delete('/:id', item_controller_1.deleteItemController);
exports.default = router;
