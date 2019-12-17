import * as express from 'express';
import * as homeController from '../controllers/homeController';
const router: express.Router = express.Router();

router.get('/', homeController.getIndexPage);
router.get('/users', homeController.getUsersPage)

export { router };
