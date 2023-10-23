import { db } from '../index.js';
import { Op } from 'sequelize';

const ParticipantModel = {
    // 참가 신청
    participatePost: async ({ transaction, userId, postId, status, matchingCount }) => {
        const createParticipant = await db.Participant.create({ userId, postId, status, matchingCount }, { transaction });
        return createParticipant;
    },

    // 참가 신청자 리스트
    getParticipants: async postId => {
        //
        const { rows: participants } = await db.Participant.findAndCountAll({
            where: { postId },
            include: [
                {
                    model: db.User,
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
                    include: [
                        {
                            model: db.UserTag,
                            attributes: ['userId'],
                            include: [
                                {
                                    model: db.Tag,
                                    attributes: ['tagName', 'tagCategoryId'],
                                    where: { tagCategoryId: 2 },
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [['matchingCount', 'DESC']],
        });
        return participants;
    },

    // 참가 신청자 리스트 (커서 O)
    getUpdatedParticipantsByCursor: async ({ postId, cursor, limit }) => {
        const { count, rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount'],
            where: { postId, canceled: 0, status: 'pending', matchingCount: { [Op.lt]: cursor } },
            limit,
            include: [
                {
                    model: db.User,
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
                    include: [
                        {
                            model: db.UserTag,
                            attributes: ['userId'],
                            include: [
                                {
                                    model: db.Tag,
                                    attributes: ['tagName', 'tagCategoryId'],
                                    where: { tagCategoryId: 2 },
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ['matchingCount', 'DESC'],
                ['userId', 'DESC'],
            ],
        });
        return participants;
    },
    // 유저 성별에 따른 참가자 리스트 조회
    getParticipantsByGender: async ({ postId, userWhere }) => {
        const { rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount'],
            where: { postId, status: 'pending', canceled: 0 },
            include: [
                {
                    model: db.User,
                    where: userWhere,
                    where: { isDeleted: 0 },
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
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
            order: [['matchingCount', 'DESC']],
        });
        return participants;
    },

    // 현재 유저가 참가 신청한 모임 추출
    getParticipationByUserId: async ({ userId, postId }) => {
        const participation = await db.Participant.findOne({
            where: { userId, postId },
        });
        return participation;
    },

    // participantId로 참가 신청 정보 조회
    getParticipationById: async participantId => {
        const participation = await db.Participant.findOne({
            where: { participantId },
            include: [
                {
                    model: db.Post,
                    attributes: ['postId', 'userId', 'recruitedM', 'recruitedF', 'totalM', 'totalF'],
                },
                {
                    model: db.User,
                    attributes: ['gender'],
                },
            ],
        });
        return participation;
    },

    // 참가 신청 변경
    update: async ({ transaction, participantId, updateField, newValue }) => {
        await db.Participant.update(
            { [updateField]: newValue },
            {
                where: { participantId },
                transaction,
            },
        );
    },
    getAcceptedUsers: async ({ postId, writerId }) => {
        const acceptedUsers = await db.Participant.findAll({
            attributes: ['participantId'],
            where: {
                postId,
                status: 'accepted',
                userId: {
                    [Op.not]: writerId,
                },
            },
            include: [
                {
                    model: db.User,
                    where: { is_deleted: 0 },
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
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
        });
        return acceptedUsers;
    },
};

export { ParticipantModel };
