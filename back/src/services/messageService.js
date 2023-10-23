import { ChatModel } from '../db/models/ChatModel.js';
import { MessageModel } from '../db/models/MessageModel.js';
import { ConflictError, InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';

const messageService = {
    //메세지 생성
    createMessage: async ({ userId, chatId, content }) => {
        try {
            const { firstId, secondId } = await ChatModel.findChatRoomByChatId(chatId);

            if (userId !== firstId && userId !== secondId) {
                throw new ConflictError('현재 채팅방에 속해있지 않습니다.');
            }

            await MessageModel.createMessage({ userId, chatId, content });
            return {
                message: '새로운 메세지 생성에 성공했습니다.',
            };
        } catch (error) {
            if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('새로운 메세지 생성에 실패했습니다.');
            }
        }
    },

    //모든 메세지 불러오기
    getMessage: async chatId => {
        try {
            let messageList = {};
            const findChat = await ChatModel.findChatRoomByChatId(chatId);
            throwNotFoundError(findChat, '채팅방');
            const chat = await MessageModel.getAllMessage(chatId);

            if (chat == 0) {
                messageList = '';
            } else {
                messageList = chat;
            }

            return { messageList, message: '유저의 메세지 불러오기에 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('유저의 메세지 불러오기에 실패 했습니다.');
            }
        }
    },
};

export { messageService };
