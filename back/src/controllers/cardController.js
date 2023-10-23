import { statusCode } from '../utils/statusCode.js';
import { cardService } from '../services/cardService.js';

const cardController = {
    saveCard: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const cardId = req.query.cardId;
            const { message, user, card } = await cardService.saveCard({ userId, cardId });

            statusCode.setResponseCode201(res);
            res.send({ message, user, card });
        } catch (error) {
            next(error);
        }
    },
    getRandomLovers: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const limit = parseInt(req.query.limit);
            const { message, card, randomLovers } = await cardService.getRandomLovers({ userId, limit });

            statusCode.setResponseCode200(res);
            res.send({ message, card, randomLovers });
        } catch (error) {
            next(error);
        }
    },
};

export { cardController };
