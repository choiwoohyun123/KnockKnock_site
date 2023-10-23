import { Router } from 'express';
import { messageController } from '../controllers/messageController.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const messageRouter = Router();
messageRouter.use(loginRequired);

// 메세지 작성
messageRouter.post('/', messageController.createMessage);

// 전체 메세지 조회
messageRouter.get('/:chatId', messageController.getMessage);

export { messageRouter };
