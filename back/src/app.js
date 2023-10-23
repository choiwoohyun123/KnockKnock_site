import express from 'express';
import specs from './swagger/swagger.js';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { db } from './db/index.js';
import { fileRouter } from './routers/fileRouter.js';
import { userRouter } from './routers/userRouter.js';
import { postRouter } from './routers/postRouter.js';
import { messageRouter } from './routers/messageRouter.js';
import { commentRouter } from './routers/commentRouter.js';
import { participantRouter } from './routers/participantRouter.js';
import { chatRouter } from './routers/chatRouter.js';
import { cardRouter } from './routers/cardRouter.js';
import { logger } from '../src/utils/logger.js';
import { morganMiddleware } from './middlewares/morgan.js';

import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

// CORS 에러 방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morganMiddleware);

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/messages', messageRouter);
app.use('/participants', participantRouter);
app.use('/chats', chatRouter);
app.use('/files', fileRouter);
app.use('/cards', cardRouter);

db.sequelize
    .sync({ force: false }) // true이면 테이블 모두 삭제 후 생성, false이면 테이블 그대로 유지
    .then(() => {
        logger.info('데이터베이스 연결 성공');
    })
    .catch(err => {
        logger.error(err);
    });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// 기본 페이지
app.get('/', (req, res) => {
    res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

app.use(errorMiddleware);

export { app };
