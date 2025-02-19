import express from 'express';
import authRoutes from './routes/auth.js';
import todosRoutes from './routes/todos.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
