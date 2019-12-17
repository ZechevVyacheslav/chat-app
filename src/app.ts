import * as express from 'express';
import * as bodyParser from 'body-parser';
const app: express.Application = express();
import * as path from 'path';
const PORT = 8080;

// Routes import
import { router as homeRouter } from './routes/homeRouter';

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes usage
app.use('/', homeRouter);
app.use((req: express.Request, res: express.Response) => {
  res.status(404).send('Not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
