import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import { createToken, verifyToken } from './utils.js';

const port = process.env.PORT || 8000;

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Available endpoints: /api/auth and /api/secret');
});

app.post('/api/auth', (req: Request, res: Response) => {
    const email = req.body.email as string

    if (!email) {
        res.status(400).json({
            error: 'Invalid request',
            message: 'This endpoint requires an email passed in request body.'
        })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailRegex.test(email)) {
        const token = createToken(email)

        res.status(200).json({
            message: 'Authenticated',
            token: token,
            tokenExpiration: '24h',
            tokenType: 'Bearer'
        })
    }
    else {
        res.status(400).json({
            error: 'Invalid request',
            message: 'Email is invalid.'
        })
    }
});

app.get('/api/secret', (req: Request, res: Response) => {
    const bearerToken = req.headers.authorization as string

    if (!bearerToken) {
        res.status(400).json({
            error: 'Invalid request',
            message: 'This endpoint requires an bearer token passed in request headers.'
        })
        return
    }

    const token = bearerToken.replace('Bearer ', '')

    try {
        verifyToken(token)
        res.status(200).json({
            'message': 'Authenticated',
            'secret': process.env.SECRET
        })
    } catch (error) {
        res.status(401).json({
            error: 'Authentication failed',
            message: 'Your token is invalid'
        })
    }

});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
