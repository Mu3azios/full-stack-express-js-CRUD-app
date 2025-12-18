import { getItems, getItem, createItem, editItem, deleteItem } from '../services/item.service.js'
import { validateItem } from '../utils/validation.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await getItems();
        res.send(items);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching items', error: error.message });
    }
};

export const getSingleItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await getItem(id);
        res.send(item);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching item', error: error.message });
    }
};

export const createNewItem = async (req, res) => {
    try {
        validateItem(req.body);
        const { name, description, price } = req.body;
        const newItem = await createItem(name, description, price);
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send({ message: 'Validation error', error: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        validateItem(req.body);
        const { name, description, price } = req.body;
        const updatedItem = await editItem(id, name, description, price);
        res.send(updatedItem);
    } catch (error) {
        res.status(500).send({ message: 'Error updating item', error: error.message });
    }
};

export const deleteExistingItem = async (req, res) => {
    try {
        const id = req.params.id;
        const success = await deleteItem(id);
        if (success) {
            res.send({ message: 'Item deleted successfully' });
        } else {
            res.status(404).send({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting item', error: error.message });
    }
};