import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

export async function getItems(): Promise<any[]> {
    const [rows] = await pool.query("SELECT * FROM items");
    return rows;
}

export async function getItem(id: number): Promise<any> {
    const [rows] = await pool.query(`
        SELECT * 
        FROM items
        WHERE id = ?
    `, [id]);
    return rows[0];
}

export async function createItem(name: string, description: string, price: number): Promise<any> {
    const [result] = await pool.query(`
        INSERT INTO items (name, description, price)
        VALUES (?, ?, ?)
    `, [name, description, price]);
    const id = result.insertId;
    return getItem(id.toString());
}

export async function editItem(id: number, name: string, description: string, price: number): Promise<any> {
    await pool.query(`
        UPDATE items
        SET name = ?, description = ?, price = ?
        WHERE id = ?
    `, [name, description, price, id]);
    return getItem(id);
}

export async function deleteItem(id: number): Promise<boolean> {
    const [result] = await pool.query(`
        DELETE FROM items
        WHERE id = ?
    `, [id]);
    return result.affectedRows > 0;
}