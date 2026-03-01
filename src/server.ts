import app from './index.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = Number(process.env.PORT) || 3033;
app.listen(PORT, () => console.log(`server playing in PORT ${PORT}`));