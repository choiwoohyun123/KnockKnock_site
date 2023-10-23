import { BadRequestError } from './errorMiddleware.js';

const postParamsValidate = (req, res, next) => {
    const postId = req.params.postId;
    if (!postId || isNaN(postId)) {
        throw new BadRequestError('게시물의 ID를 확인해주세요.');
    }

    next();
};

export { postParamsValidate };
