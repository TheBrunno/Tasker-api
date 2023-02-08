import { Router } from 'express';

import taskController from '../controllers/TaskController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, taskController.index);
router.post('/', loginRequired, taskController.store);
router.put('/:id', loginRequired, taskController.update);
router.delete('/:id', loginRequired, taskController.delete);

export default router;
