import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
    const payload = { userId };
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' });
    return token;
};

export default generateToken;