"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSchema = void 0;
const zod_1 = require("zod");
exports.itemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().min(0.01, 'Price must be greater than 0'),
});
