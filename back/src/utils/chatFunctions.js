import { ChatModel } from '../db/models/ChatModel.js';
import { UserModel } from '../db/models/UserModel.js';

const getSenderReciever = async (userId, chatId) => {
    let currentUserInfo = [];

    const currentUserId = userId;
    const chatRoom = await ChatModel.findChatRoomByChatId(chatId);

    let sender, reciever;

    if (currentUserId == chatRoom.firstId) {
        sender = chatRoom.firstId;
        reciever = chatRoom.secondId;
        currentUserInfo = { sender, reciever, chatId: chatRoom.chatId };
    } else {
        sender = chatRoom.secondId;
        reciever = chatRoom.firstId;
        currentUserInfo = { sender, reciever, chatId: chatRoom.chatId };
    }
    const recieverInfo = await UserModel.findProfileById(reciever);

    return { currentUserInfo, recieverInfo };
};

export { getSenderReciever };
