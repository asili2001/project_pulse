import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

// Set the appropriate environment file
if (process.env.NODE_ENV === 'development') {
    console.info("------------ Development ------------");
    
    dotenv.config({ path: './.env.dev' });
} else {
    dotenv.config({ path: './.env.prod' });
}

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import projectRouter from './routes/project.route';

const app: Application = express();

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://127.0.0.1', 'http://localhost'];

app.use(cors({ credentials: true, origin: allowedOrigins }));


app.use('/', routes);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);


app.listen(process.env.APP_PORT, () => {
    console.info(`Server is running on port ${process.env.APP_PORT}`);
});

export {app};