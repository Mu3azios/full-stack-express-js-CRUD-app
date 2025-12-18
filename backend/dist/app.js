"use strict";
//! old code
// import express, { Express, Request, Response, NextFunction } from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import itemRoute from "./routes/item.route";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// const app: Express = express();
// const port = process.env.PORT || 3000;
// // Middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Routes
// app.use('/api/item', itemRoute);
// // Error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
// // Start server
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
// export default app; 
//? new code
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const item_route_1 = tslib_1.__importDefault(require("./routes/item.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/items', item_route_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});
app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});
