import { BadRequestError } from './errorMiddleware.js';

const userParamsValidate = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId || isNaN(userId)) {
        throw new BadRequestError('게시물의 ID를 확인해주세요.');
    }

    next();
};

export { userParamsValidate };
