import { Router } from 'express';

import taskController from '../controllers/TaskController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', taskController.index);
router.post('/', loginRequired, taskController.store);

export default router;