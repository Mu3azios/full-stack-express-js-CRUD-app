import { z } from 'zod';

export const itemSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  price: z.number().min(0.01, 'Price must be greater than 0'),
});

export const validateItem = (data) => itemSchema.parse(data);
