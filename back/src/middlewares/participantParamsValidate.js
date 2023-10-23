import { BadRequestError } from './errorMiddleware.js';

const participantParamsValidate = (req, res, next) => {
    const participantId = req.params.participantId;
    if (!participantId || isNaN(participantId)) {
        throw new BadRequestError('참가 ID를 확인해주세요.');
    }

    next();
};

export { participantParamsValidate };
