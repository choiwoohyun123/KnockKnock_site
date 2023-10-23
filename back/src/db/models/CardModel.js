import { db } from '../index.js';
import { Op } from 'sequelize';

const CardModel = {
    // 카드 개별 조회
    getCardById: async cardId => {
        return await db.Card.findOne({
            where: { cardId },
            include: [
                {
                    model: db.CardFile,
                    attributes: ['fileId'],
                    include: [{ model: db.File, attributes: ['url'], where: { category: 'card' } }],
                },
            ],
        });
    },
    // 카드 같은 유저 랜덤 조회
    findRandomLovers: async ({ gender, cardId, limit, currentMonth }) => {
        try {
            return await db.UserCard.findAll({
                where: {
                    cardId,
                    createdAt: {
                        [Op.and]: [
                            db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('UserCard.created_at')), currentMonth),
                        ],
                    },
                },
                attributes: ['cardId'],
                include: [
                    {
                        model: db.User,
                        attributes: [
                            'userId',
                            'email',
                            'nickname',
                            'gender',
                            'birthday',
                            'age',
                            'job',
                            'region',
                            'mbti',
                            'height',
                            'introduce',
                        ],
                        where: { gender, isDeleted: 0 },
                        include: [
                            {
                                model: db.UserFile,
                                attributes: ['fileId'],
                                include: [
                                    {
                                        model: db.File,
                                        attributes: ['url'],
                                        where: {
                                            category: 'profile',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: db.sequelize.random(),
                limit,
            });
        } catch (e) {
            console.error(e);
        }
    },

    // 유저가 뽑은 카드 저장
    saveCard: async ({ userId, cardId, transaction }) => {
        return await db.UserCard.create({ userId, cardId }, { transaction });
    },

    // 이미 카드를 뽑은 유저인지 검증
    checkPlayed: async userId => {
        return await db.UserCard.findAll({ where: { userId } });
    },
};

export { CardModel };
