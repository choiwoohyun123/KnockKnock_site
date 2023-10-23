import { db } from '../index.js';

const PostModel = {
    create: async ({ newPost }) => {
        const post = await db.Post.create(newPost);
        return post;
    },
    getAllPosts: async ({ offset, limit }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({
            offset,
            limit,
            distinct: true,
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                    where: { isDeleted: 0 },
                    include: [
                        {
                            model: db.UserFile,
                            attributes: ['fileId'],
                            include: [{ model: db.File, attributes: ['url'], where: { category: 'profile' } }],
                        },
                    ],
                },
                { model: db.PostFile, attributes: ['postId', 'fileId'], include: [{ model: db.File, attributes: ['url'] }] },
            ],
            order: [
                ['createdAt', 'DESC'],
                ['postId', 'DESC'],
            ],
        });
        return { total: count, posts };
    },
    getFilteredPosts: async ({ offset, limit, type }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({
            where: { type },
            offset,
            limit,
            distinct: true,
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                    where: { is_deleted: 0 },
                    include: [
                        {
                            model: db.UserFile,
                            attributes: ['fileId'],
                            include: [{ model: db.File, attributes: ['url'], where: { category: 'profile' } }],
                        },
                    ],
                },
                {
                    model: db.PostFile,
                    attributes: ['postId', 'fileId'],
                    include: [{ model: db.File, attributes: ['url'] }],
                },
            ],
            order: [
                ['createdAt', 'DESC'],
                ['postId', 'DESC'],
            ],
        });
        return { total: count, posts };
    },
    getPostById: async postId => {
        const post = await db.Post.findOne({
            where: {
                postId,
            },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                    include: [
                        {
                            model: db.UserFile,
                            attributes: ['fileId'],
                            include: [{ model: db.File, attributes: ['url'], where: { category: 'profile' } }],
                        },
                    ],
                },
                {
                    model: db.PostFile,
                    attributes: ['postId', 'fileId'],
                    include: [{ model: db.File, attributes: ['url'], where: { category: 'post' } }],
                },
            ],
        });
        return post;
    },
    update: async ({ transaction, postId, fieldToUpdate, newValue }) => {
        const updatePost = await db.Post.update(
            { [fieldToUpdate]: newValue },
            {
                where: { postId },
                transaction,
            },
        );
        return updatePost;
    },
    delete: async postId => {
        await db.Post.destroy({
            where: { postId },
        });
    },
};

export { PostModel };
