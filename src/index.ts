import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import secretRouter from './routes/secret.js';

const app: Express = express();

app.use(express.json());
app.use(logger(':date :method :url :status :response-time ms'));

app.get('/', (req: Request, res: Response) => {
    res.send('Available endpoints: /api/auth and /api/secret');
});

app.use('/api', secretRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`⚡️Server is running at http://localhost:${port}`);
});
