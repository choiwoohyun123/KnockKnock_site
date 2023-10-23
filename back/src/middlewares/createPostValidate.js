import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const allowedPostTypes = ['술', '영화', '식사', '카페', '산책', '드라이브', '공연관람', '기타'];

const createPostValidationRules = [
    body('title')
        .notEmpty()
        .withMessage('제목을 입력하세요.')
        .isLength({ max: 15 })
        .withMessage('게시글 제목은 15자 이내로 작성해주세요.'),
    body('content')
        .notEmpty()
        .withMessage('내용을 입력하세요.')
        .isLength({ max: 200 })
        .withMessage('게시글 내용은 200자 이내로 작성해주세요'),
    body('type')
        .notEmpty()
        .withMessage('모임의 목적을 입력하세요.')
        .custom(value => {
            if (!allowedPostTypes.includes(value)) {
                throw new BadRequestError('유효하지 않은 모임 목적입니다.');
            }
            return true;
        }),
    body('totalM').notEmpty().withMessage('모임 인원을 입력하세요.'),
    body('totalF').notEmpty().withMessage('모임 인원을 입력하세요.'),
    body('place').notEmpty().withMessage('모임 장소를 입력하세요.'),
    body('meetingTime').notEmpty().withMessage('모임 시간을 입력하세요.'),
];

const createPostValidate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { createPostValidate, createPostValidationRules };
