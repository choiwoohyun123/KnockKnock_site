import { chatService } from '../services/chatService.js';
import { statusCode } from '../utils/statusCode.js';

const chatController = {
    createChat: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const { anotherId } = req.body;

            const { usingChat, message } = await chatService.createChat({ userId, anotherId });
            statusCode.setResponseCode201(res);
            return res.send({ usingChat, message });
        } catch (error) {
            next(error);
        }
    },

    getUserChats: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const { allChats, message } = await chatService.getListChats(userId);

            statusCode.setResponseCode200(res);
            return res.send({ allChats, message });
        } catch (error) {
            next(error);
        }
    },

    getChat: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const chatId = req.params.chatId;

            const { recieverInfo, currentUserInfo, message } = await chatService.getChat({ userId, chatId });

            statusCode.setResponseCode200(res);
            return res.send({ currentUserInfo, recieverInfo, message });
        } catch (error) {
            next(error);
        }
    },
};

export { chatController };
