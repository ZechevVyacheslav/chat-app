import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app: express.Application = express();
import * as path from 'path';
import * as swaggerUI from 'swagger-ui-express';

// Routes import
import { router as authRouter } from './routes/authRouter';
import roomRouter from './routes/roomRouter';
import adminRouter from './routes/adminRouter';
import swaggerDoc from './swaggerDoc';

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    next();
  }
);

// Routes usage
app.use('/user', authRouter);
app.use('/rooms', roomRouter);
app.use('/admin', adminRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(
  (
    error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    const message = error.message;
    res.json({ message });
  }
);

export { app };
