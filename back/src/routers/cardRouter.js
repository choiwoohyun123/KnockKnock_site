import { Router } from 'express';
import { cardController } from '../controllers/cardController.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const cardRouter = Router();
cardRouter.use(loginRequired);

// 전체 카드 불러오기
// cardRouter.get('/', cardController.getAllCards);

// 유저카드에 생성 : 뽑은 카드 저장
cardRouter.post('/', cardController.saveCard);

// 같은 카드 뽑은 유저 3명 랜덤 조회
cardRouter.get('/', cardController.getRandomLovers);

export { cardRouter };
