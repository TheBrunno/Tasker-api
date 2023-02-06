import { Router } from 'express';

import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', userController.index);
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);

export default router;
