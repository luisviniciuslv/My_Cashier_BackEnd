import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = "123";
if(!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
} else {
  const JWT_SECRET = process.env.JWT_SECRET;
}
export default JWT_SECRET;