import { CardModel } from '../db/models/CardModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { ConflictError, InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';
import { db } from '../db/index.js';

const cardService = {
    saveCard: async ({ userId, cardId }) => {
        const transaction = await db.sequelize.transaction({ autocommit: false });
        try {
            const card = await CardModel.getCardById(cardId);
            throwNotFoundError(card, '카드');
            card.content = card.content.split('/');
            await CardModel.saveCard({ userId, cardId, transaction });

            const currentMonth = new Date().getMonth() + 1;
            const checked = await CardModel.checkPlayed(userId);

            if (checked.length > 0 && currentMonth == checked.pop().createdAt.getMonth() + 1) {
                throw new ConflictError('이미 게임에 참가한 유저입니다.');
            }

            await transaction.commit();
            return { message: '유저 카드 정보 저장에 성공했습니다.', user: userId, card };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('유저 카드 정보 저장에 실패했습니다.');
            }
        }
    },
    getRandomLovers: async ({ userId, limit }) => {
        try {
            const user = await UserModel.findById(userId);
            throwNotFoundError(user, '유저');

            let genderToFind; // 로그인 유저가 남자면 여자를 보이고 그 반대도 마찬가지
            if (user.gender === '남') {
                genderToFind = '여';
            } else {
                genderToFind = '남';
            }

            const currentMonth = new Date().getMonth() + 1;
            const cards = await CardModel.checkPlayed(userId);

            if (cards.length == 0) {
                return { message: '카드를 뽑은 내역이 없습니다.', randomLovers: [] };
            }

            const currentCard = cards.pop();

            if (currentMonth !== currentCard.createdAt.getMonth() + 1) {
                return { message: '이번 달에 카드를 뽑은 내역이 없습니다.', randomLovers: [] };
            }

            const randomLovers = await CardModel.findRandomLovers({
                cardId: currentCard.cardId,
                gender: genderToFind,
                limit,
                currentMonth,
            });

            const card = await CardModel.getCardById(currentCard.cardId);
            card.content = card.content.split('/');

            if (!randomLovers || randomLovers.length === 0) {
                return { message: '이번 달에 같은 카드를 뽑은 다른 유저가 없습니다.', card, randomLovers: [] };
            }

            return {
                message: '랜덤으로 유저 3명 조회하기 성공!',
                cardId: currentCard.cardId,
                card,
                randomLovers,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('랜덤으로 유저들을 조회하는 데 실패했습니다.');
            }
        }
    },
};

export { cardService };
