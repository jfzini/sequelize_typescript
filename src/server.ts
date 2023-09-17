import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = 3001;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT} ${process.env.JWT_SECRET}`,
));

export default server;
