import { commentService } from '../services/commentService.js';
import { statusCode } from '../utils/statusCode.js';

const commentController = {
    create: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const { content } = req.body;

            const createComment = await commentService.createComment({ userId, postId, content });

            statusCode.setResponseCode201(res);
            return res.send({ message: createComment.message, commentId: createComment.commentId });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const commentId = req.params.commentId;
            const { content } = req.body;

            const updateComment = await commentService.updateComment({ userId, postId, commentId, content });

            statusCode.setResponseCode200(res);
            return res.send({ message: updateComment.message });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const commentId = req.params.commentId;

            const deleteComment = await commentService.deleteComment({ userId, postId, commentId });
            statusCode.setResponseCode200(res);

            return res.send({ message: deleteComment.message });
        } catch (error) {
            next(error);
        }
    },

    getComment: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const cursor = req.query.cursor;
            const limit = req.query.limit;

            const getComment = await commentService.getComment({ userId, postId, cursor, limit });
            statusCode.setResponseCode200(res);
            return res.send({
                message: getComment.message,
                commentList: getComment.commentList,
            });
        } catch (error) {
            next(error);
        }
    },
};

export { commentController };
