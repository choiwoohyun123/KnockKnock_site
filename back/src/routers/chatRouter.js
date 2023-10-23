import { Router } from 'express';
import { chatController } from '../controllers/chatController.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const chatRouter = Router();
chatRouter.use(loginRequired);

// 채팅 방 생성
chatRouter.post('/', chatController.createChat);

// 전체 채팅 조회
chatRouter.get('/', chatController.getUserChats);

// 개별 채팅 조회
chatRouter.get('/:chatId', chatController.getChat);

export { chatRouter };
