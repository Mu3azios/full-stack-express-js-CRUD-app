//  import mysql from 'mysql2'
//  import dontenv from 'dotenv'
//  dontenv.config() 
//  const pool = mysql.createPool({
//      host: process.env.MYSQL_HOST,
//      user:process.env.MYSQL_USER,
//      password:process.env.MYSQL_PASSWORD,
//      database:process.env.MYSQL_DATABASE,
//  }).promise()
//  export async function getItems() {
//      const [rows] = await pool.query("SELECT * FROM items")
//      return rows
//  }
//  export async function getItem(id){
//      const [rows] = await pool.query(`
//          SELECT * 
//          FROM items
//          WHERE id = ?
//          `, [id])
//          return rows[0]
//  }
//  export async function createItem(name, description, price) {
//  const [result] = await pool.query(`
//      INSERT INTO items (name, description, price)
//      VALUES (?, ?, ?)
//      `, [name, description, price])
//      const id = result.insertId
//      return getItem(id)  
//  }
//  export async function editItem(id, name, description, price) {
//      await pool.query(`
//          UPDATE items
//          SET name = ?, description = ?, price = ?
//          WHERE id = ?
//          `, [name, description, price, id])
//      return getItem(id)
//  }
//  export async function deleteItem(id) {
//      const [result] = await pool.query(`
//          DELETE FROM items
//          WHERE id = ?
//          `, [id])
//      return result.affectedRows > 0
//  }

// import mysql from 'mysql2';
// import dotenv from 'dotenv';



// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// }).promise();

// export async function getItems() {
//   const [rows] = await pool.query('SELECT * FROM items');
//   return rows;
// }

// export async function getItem(id) {
//   const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
//   return rows[0];
// }

// export async function createItem(name, description, price) {
//   const [result] = await pool.query('INSERT INTO items (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
//   return getItem(result.insertId);
// }

// export async function editItem(id, name, description, price) {
//   await pool.query('UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
//   return getItem(id);
// }

// export async function deleteItem(id) {
//   const [result] = await pool.query('DELETE FROM items WHERE id = ?', [id]);
//   return result.affectedRows > 0;
// }