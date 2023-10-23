import { ChatModel } from '../db/models/ChatModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { ConflictError, InternalServerError } from '../middlewares/errorMiddleware.js';
import { getSenderReciever } from '../utils/chatFunctions.js';

const chatService = {
    //채팅방 생성
    createChat: async ({ userId, anotherId }) => {
        try {
            let usingChat = [];
            const chat = await ChatModel.checkExistingChatRoom({ userId, anotherId });

            if (chat) {
                usingChat = chat.chatId;
                return { usingChat, message: '이미 존재하는 채팅방입니다.' };
            } else {
                usingChat = await ChatModel.create({ userId, anotherId });
                return {
                    usingChat,
                    message: '새로운 채팅 방 생성에 성공했습니다.',
                };
            }
        } catch (error) {
            if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('채팅방 생성에 실패했습니다.');
            }
        }
    },

    //유저의 채팅 리스트 불러오기
    getListChats: async userId => {
        try {
            const allChatList = await ChatModel.getUserChats(userId);

            let allChats = [];

            const chatIds = allChatList.map(chat => chat.chatId);

            for (let i = 0; i < chatIds.length; i++) {
                const chatId = chatIds[i];
                const { currentUserInfo, recieverInfo } = await getSenderReciever(userId, chatId);

                if (recieverInfo) {
                    allChats.push({ currentUserInfo, recieverInfo });
                }
            }

            return {
                allChats,
                message: '유저의 채팅 목록 불러오기에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('유저의 채팅 목록 불러오기에 실패 했습니다.');
        }
    },

    // 유저의 채팅 불러오기
    getChat: async ({ userId, chatId }) => {
        try {
            const { currentUserInfo, recieverInfo } = await getSenderReciever(userId, chatId);
            return {
                currentUserInfo,
                recieverInfo,
                message: '유저의 채팅 불러오기에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('유저의 채팅 불러오기에 실패 했습니다.');
        }
    },
};

export { chatService };
