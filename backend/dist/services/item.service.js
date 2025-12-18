"use strict";
// import { getItems, getItem, createItem, updateItem, deleteItem } from '../database'; 
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
// export const getAllItems = async () => {
//   return await getItems();
// };
// export const getItemById = async (id: number) => {
//   return await getItem(id);
// };
// export const createItem = async (itemData: any) => { 
//   return await createItem(itemData.name, itemData.description, itemData.price);
// };
// export const updateItem = async (id: number, itemData: any) => {
//   return await updateItem(id, itemData.name, itemData.description, itemData.price);
// };
// export const deleteItem = async (id: number) => {
//   return await deleteItem(id);
// };
const database_1 = require("../database");
const getAllItems = async () => await (0, database_1.getItems)();
exports.getAllItems = getAllItems;
const getItemById = async (id) => await (0, database_1.getItem)(id);
exports.getItemById = getItemById;
const createItem = async (data) => await (0, database_1.createItem)(data.name, data.description, data.price);
exports.createItem = createItem;
const updateItem = async (id, data) => await (0, database_1.editItem)(id, data.name, data.description, data.price);
exports.updateItem = updateItem;
const deleteItem = async (id) => await (0, database_1.deleteItem)(id);
exports.deleteItem = deleteItem;
