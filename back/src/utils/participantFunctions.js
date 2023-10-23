import { checkAccess, throwNotFoundError } from './commonFunctions.js';
import { ConflictError } from '../middlewares/errorMiddleware.js';

const checkParticipationStatus = async (type, participation, userId) => {
    const { Post, canceled, status, User } = participation;

    throwNotFoundError(Post, '게시글');
    checkAccess(userId, Post.userId, type);

    if (canceled) {
        throw new ConflictError('취소된 신청 정보입니다.');
    }

    if (status !== 'pending') {
        throw new ConflictError('이미 수락되었거나 거절된 유저입니다.');
    }

    return { Post, canceled, status, User };
};

const updateRecruitedValue = async (gender, totalM, totalF, recruitedF, recruitedM) => {
    let fieldToUpdate, newValue, isCompleted;
    if (gender === '여') {
        fieldToUpdate = 'recruitedF';

        if (recruitedF === totalF) {
            throw new ConflictError('더 이상 여성 유저의 신청을 수락할 수 없습니다.');
        }
        newValue = recruitedF + 1;
        isCompleted = newValue === totalF && recruitedM === totalM;
    }

    if (gender === '남') {
        fieldToUpdate = 'recruitedM';
        if (recruitedM === totalM) {
            throw new ConflictError('더 이상 남성 유저의 신청을 수락할 수 없습니다.');
        }
        newValue = recruitedM + 1;
        isCompleted = newValue === totalM && recruitedF === totalF;
    }

    return { fieldToUpdate, newValue, isCompleted };
};

const hobbyCategoryId = 1;
const personalityCategoryId = 2;
const idealCategoryId = 3;

const getIdealAndPersonality = async user => {
    let hobby = [];
    let ideal = [];
    let personality = [];

    for (const userTag of user.UserTags) {
        if (userTag.Tag.tagCategoryId === hobbyCategoryId) {
            hobby.push(userTag.Tag.tagName);
        } else if (userTag.Tag.tagCategoryId === personalityCategoryId) {
            personality.push(userTag.Tag.tagName);
        } else if (userTag.Tag.tagCategoryId === idealCategoryId) {
            ideal.push(userTag.Tag.tagName);
        }
    }
    return { hobby, ideal, personality };
};

const getMatchingCount = async (firstUser, secondUser) => {
    const { ideal } = await getIdealAndPersonality(firstUser);
    const { personality } = await getIdealAndPersonality(secondUser);

    const matchingCount = ideal.filter(tag => personality.includes(tag)).length;
    return matchingCount;
};

const hasReachedLimit = (participants, gender) => {
    const filteredParticipants = participants.filter(participant => participant.User.gender === gender);
    return filteredParticipants.length >= 10;
};

export { checkParticipationStatus, updateRecruitedValue, getIdealAndPersonality, getMatchingCount, hasReachedLimit };
