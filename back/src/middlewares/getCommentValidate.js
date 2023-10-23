import { BadRequestError } from './errorMiddleware.js';

const getCommentValidate = (req, res, next) => {
    const postId = req.params.postId;
    const cursor = req.query.cursor;
    const limit = req.query.limit;

    if (!postId || isNaN(postId)) {
        throw new BadRequestError('게시물의 ID를 확인해주세요.');
    }

    if (!cursor || isNaN(cursor)) {
        throw new BadRequestError('댓글의 cursor값을 확인해주세요.');
    }

    if (!limit || isNaN(limit)) {
        throw new BadRequestError('댓글의 limit값을 확인해주세요.');
    }

    next();
};

export { getCommentValidate };
