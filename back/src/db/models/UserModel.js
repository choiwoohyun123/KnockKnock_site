import { db } from '../index.js';
import { Op } from 'sequelize';
const UserModel = {
    // 유저 생성
    create: async (newUser, transaction) => {
        return await db.User.create(newUser, { transaction });
    },
    // 유저 태그 생성
    bulkCreateTags: async (newTags, transaction) => {
        return await db.UserTag.bulkCreate(newTags, { transaction });
    },
    // 유저 태그 삭제
    deleteTags: async (userId, tagCategoryId) => {
        // 모든 UserTag의 id들을 찾아서 userId, tag_categoryId와 일치하는 데이터 삭제
        const userTags = await db.UserTag.findAll({
            where: {
                userId,
                tagCategoryId,
            },
        });
        // 태그아이디만 뽑아서 배열 만들기 [1,2]
        const userTagIds = userTags.map(userTag => userTag.id);
        // UserTag 행들 삭제
        const deleteCount = await db.UserTag.destroy({
            where: {
                id: userTagIds,
            },
        });

        return deleteCount;
    },
    // tagId 찾아내기
    findTagId: async (tagName, tagCategoryId) => {
        return await db.Tag.findOne({
            where: {
                tagName,
                tagCategoryId,
            },
        });
    },
    // UserTag 매핑 테이블의 tagId 찾아내기
    findByUserId: async userId => {
        return await db.UserTag.findAll({
            where: {
                userId,
                tagCategoryId,
            },
        });
    },
    // email로 유저 찾아내기(email 중복 확인)
    findByEmail: async email => {
        const user = await db.User.findOne({
            where: {
                email,
                isDeleted: 0,
            },
        });

        return user;
    },
    findByNickname: async nickname => {
        const user = await db.User.findOne({
            where: {
                nickname,
                isDeleted: 0,
            },
        });
        return user;
    },
    // userId 검색해서 유저 찾기
    findById: async userId => {
        const user = await db.User.findOne({
            where: {
                userId,
                isDeleted: 0,
            },
            include: [
                {
                    model: db.UserTag,
                    attributes: ['userId'],
                    include: [{ model: db.Tag, attributes: ['tagName', 'tagCategoryId'] }],
                },
                {
                    model: db.UserFile,
                    attributes: ['userId', 'fileId'],
                    include: [
                        {
                            model: db.File,
                            attributes: ['url'],
                            where: {
                                [Op.or]: [{ category: 'profile' }, { category: 'background' }],
                            },
                        },
                    ],
                },
            ],
        });
        return user;
    },
    // limit(정수)에 해당하는 인원 랜덤으로 조회하기
    findRandomUsers: async (gender, limit) => {
        const randomUsers = await db.User.findAll({
            where: {
                gender,
                isDeleted: 0,
            },
            include: [
                {
                    model: db.UserTag,
                    attributes: ['userId'],
                    include: [{ model: db.Tag, attributes: ['tagName', 'tagCategoryId'] }],
                },
                {
                    model: db.UserFile,
                    attributes: ['userId', 'fileId'],
                    include: [
                        {
                            model: db.File,
                            attributes: ['url'],
                            where: {
                                [Op.or]: [{ category: 'profile' }, { category: 'background' }],
                            },
                        },
                    ],
                },
            ],
            order: db.sequelize.random(),
            limit,
        });

        return randomUsers;
    },
    // 로그인한 유저가 작성한 게시글 찾기
    findMyPosts: async userId => {
        return await db.Post.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: db.PostFile,
                    attributes: ['postId', 'fileId'],
                    include: [{ model: db.File, attributes: ['url'], where: { category: 'post' } }],
                },
            ],
        });
    },
    // 로그인한 유저가 참여한 게시글 찾기
    findMyParticipants: async userId => {
        return await db.Participant.findAll({
            where: {
                userId,
                status: 'accepted',
            },
            include: [
                {
                    model: db.Post,
                    where: {
                        userId: {
                            [Op.not]: userId,
                        },
                    },
                    include: [
                        {
                            model: db.PostFile,
                            attributes: ['fileId'],
                            include: [{ model: db.File, attributes: ['url'], where: { category: 'post' } }],
                        },
                        { model: db.User, attributes: [], where: { isDeleted: 0 } },
                    ],
                },
            ],
        });
    },
    // 유저 정보 업데이트
    update: async ({ userId, updateData }) => {
        try {
            const updatedUser = await db.User.update(updateData, {
                where: {
                    userId,
                    isDeleted: 0,
                },
            });

            return updatedUser;
        } catch (error) {
            console.error(error);
        }
    },
    // 유저 정보 삭제
    delete: async ({ userId }) => {
        const deleteUser = await db.User.update(
            {
                isDeleted: 1,
                deletedAt: new Date(),
            },
            {
                where: {
                    userId,
                    isDeleted: 0,
                },
            },
        );
        return deleteUser;
    },
    findProfileById: async userId => {
        const user = await db.User.findOne({
            attributes: ['userId', 'nickname'],
            where: {
                userId,
                isDeleted: 0,
            },
            include: [
                {
                    model: db.UserFile,
                    attributes: ['userId', 'fileId'],
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
        });
        return user;
    },
    findPassword: async userId => {
        return await db.User.findOne({
            attributes: ['password'],
            where: {
                userId,
                isDeleted: 0,
            },
        });
    },
};

export { UserModel };
