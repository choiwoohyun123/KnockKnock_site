import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const setPasswordValidationRules = [
    body('newPassword')
        .notEmpty()
        .withMessage('비밀번호를 입력하세요.')
        .isLength({ min: 8 })
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
        .withMessage('비밀번호는 숫자와 특수 기호를 포함하여 최소 8글자 이상이어야 합니다.'),
];

const setPasswordValidate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { setPasswordValidationRules, setPasswordValidate };
