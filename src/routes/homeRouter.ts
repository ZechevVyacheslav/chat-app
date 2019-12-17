import * as express from 'express';
import { getIndexPage } from '../controllers/homeController';
const router: express.Router = express.Router();

router.get('/', getIndexPage);

export { router };
