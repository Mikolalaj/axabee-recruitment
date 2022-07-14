import express, { Express, Request, Response, Router } from 'express';
import { createToken, verifyToken } from '../jwtUtils.js';
import jwt from 'jsonwebtoken';
const { TokenExpiredError, JsonWebTokenError } = jwt;

const router: Router = express.Router();

interface TypedRequestBody<T> extends Express.Request {
    body: T
}

router.post('/auth', (req: TypedRequestBody<{ email: string }>, res: Response) => {
    const email = req.body.email

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
            tokenExpiration: `${process.env.JWT_EXPIRATION_TIME}` || '24h',
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

router.get('/secret', (req: Request, res: Response) => {
    const bearerToken = req.headers.authorization

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
        if (error instanceof TokenExpiredError) {
            res.status(401).json({
                error: 'Authentication failed',
                message: 'Your token is expired'
            })
        }
        else if (error instanceof JsonWebTokenError) {
            res.status(401).json({
                error: 'Authentication failed',
                message: 'Your token is invalid'
            })
        }
        else {
            throw error
        }
    }

});

export default router;