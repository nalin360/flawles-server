import crypto from 'crypto';

const SECRET = process.env.SECRET! || ' ';
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    const hmac = crypto.createHmac('sha256', [salt, password].join('/'));
    hmac.update(SECRET);
    return hmac.digest('hex'); // Convert the HMAC to a hexadecimal string
}
