import 'reflect-metadata'
import { AppDataSource } from './data-source.js';
import cors from 'cors';
import app from './index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3033;
app.use(cors())

// AppDataSource.initialize()
//   .then(() => {
//     console.log('✅ Banco de dados conectado!');
//     app.listen(PORT, () => {
//       console.log(`🌐 Servidor rodando em http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Erro ao conectar ao banco:', err);
//     process.exit(1);
//   });

    app.listen(PORT, () => { console.log(`🌐 Servidor rodando em http://localhost:${PORT}`)});