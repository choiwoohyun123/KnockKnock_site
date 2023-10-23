import { db } from '../index.js';

const MessageModel = {
    createMessage: async ({ userId, chatId, content }) => {
        const createMessage = await db.Message.create({ senderId: userId, chatId, content });

        return createMessage;
    },

    getAllMessage: async chatId => {
        const getAllMessage = await db.Message.findAll({
            where: {
                chatId,
            },
        });
        return getAllMessage;
    },
};

export { MessageModel };
