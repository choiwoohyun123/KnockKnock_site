import { BadRequestError } from './errorMiddleware.js';

const getPostValidate = (req, res, next) => {
    const page = parseInt(req.query.page || 1);
    const perPage = parseInt(req.query.perPage || 5);

    if (isNaN(perPage) || isNaN(page)) {
        throw new BadRequestError('유효한 페이지네이션 파라미터를 제공해주세요.');
    }

    next();
};

export { getPostValidate };
