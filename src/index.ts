import 'dotenv/config';
import express from 'express';
const app = express();

app.use(express.json());
export default app;
//health get
app.get('/health', async (_req, res) => {
    res.json({
        server: true,
    });
});
