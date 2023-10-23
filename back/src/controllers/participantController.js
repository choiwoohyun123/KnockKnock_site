import { statusCode } from '../utils/statusCode.js';
import { participantService } from '../services/participantService.js';
const participantController = {
    participatePost: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const { message, participationFlag } = await participantService.participatePost({ userId, postId });

            statusCode.setResponseCode201(res);
            res.send({ message, participationFlag });
        } catch (error) {
            next(error);
        }
    },
    participateCancel: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const { message, canceled } = await participantService.participateCancel({ userId, postId });

            statusCode.setResponseCode201(res);
            res.send({ message, participationFlag: canceled });
        } catch (error) {
            next(error);
        }
    },
    checkParticipation: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const status = await participantService.checkParticipation({ userId, postId });
            statusCode.setResponseCode200(res);
            res.send(status);
        } catch (error) {
            next(error);
        }
    },
    getParticipants: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const gender = req.query.gender;

            const { message, isFulled, participantsList } = await participantService.getParticipants({
                userId,
                postId,
                gender,
            });

            statusCode.setResponseCode200(res);
            res.send({
                message,
                isFulled,
                participantsList,
            });
        } catch (error) {
            next(error);
        }
    },
    allow: async (req, res, next) => {
        try {
            const participantId = req.params.participantId;
            const userId = req.currentUserId;

            const participant = await participantService.allow({ participantId, userId });

            statusCode.setResponseCode200(res);
            res.send({
                message: participant.message,
                totalM: participant.totalM,
                totalF: participant.totalF,
                recruitedM: participant.recruitedM,
                recruitedF: participant.recruitedF,
            });
        } catch (error) {
            next(error);
        }
    },
    deny: async (req, res, next) => {
        try {
            const participantId = req.params.participantId;
            const userId = req.currentUserId;
            const participant = await participantService.deny({ participantId, userId });

            statusCode.setResponseCode200(res);
            res.send({ message: participant.message });
        } catch (error) {
            next(error);
        }
    },
    getAcceptedUsers: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const { message, acceptedUsers } = await participantService.getAcceptedUsers({ userId, postId });

            statusCode.setResponseCode200(res);
            res.send({ message, acceptedUsers });
        } catch (error) {
            next(error);
        }
    },
    allowCancel: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const participantId = parseInt(req.query.participantId);

            const { message } = await participantService.allowCancel({ userId, postId, participantId });

            statusCode.setResponseCode200(res);
            res.send({ message });
        } catch (error) {
            next(error);
        }
    },
};
export { participantController };
