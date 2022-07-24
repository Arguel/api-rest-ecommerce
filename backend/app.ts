import express from 'express';
import routes from './routes';

// Main application
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

export default app;
