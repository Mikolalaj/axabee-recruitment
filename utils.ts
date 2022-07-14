import jwt from 'jsonwebtoken';

function createToken(email: string) {
    return jwt.sign(
        { email },
        process.env.SECRET_JWT,
        { algorithm: 'HS256', expiresIn: `${process.env.JWT_EXPIRATION_TIME}` || '24h' }
    );
}

function verifyToken(token: string) {
    return jwt.verify(token, process.env.SECRET_JWT, { algorithms: ['HS256'] });
}

export {
    createToken,
    verifyToken
};
