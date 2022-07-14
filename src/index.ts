import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import secretRouter from './routes/secret.js';
import { readFile } from 'fs';
import { marked } from 'marked';

const app: Express = express();

app.use(express.json());
app.use(logger(':date :method :url :status :response-time ms'));

app.get('/', (req: Request, res: Response) => {
    readFile('./readme.md', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(marked(data.toString()));
        }
    });
});

app.use('/api', secretRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`⚡️Server is running at http://localhost:${port}`);
});
