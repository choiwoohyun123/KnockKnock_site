import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { ConflictError, InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { db } from '../db/index.js';
import { PostModel } from '../db/models/PostModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { checkAccess, throwNotFoundError } from '../utils/commonFunctions.js';
import {
    checkParticipationStatus,
    updateRecruitedValue,
    getMatchingCount,
    hasReachedLimit,
} from '../utils/participantFunctions.js';

const participantService = {
    participatePost: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            const writer = await UserModel.findById(post.userId);
            const participant = await UserModel.findById(userId);
            throwNotFoundError(post, '게시글');

            if (post.userId === userId) {
                throw new ConflictError('게시글의 작성자는 참가 신청을 할 수 없습니다.');
            }

            // 참여자 리스트를 불러오고 성별에 따라 10명 제한하기
            const participants = await ParticipantModel.getParticipants(postId);

            if (hasReachedLimit(participants, participant.gender)) {
                throw new ConflictError(
                    `현재 게시물에 ${participant.gender === '남' ? '남자' : '여자'}는 더이상 참여 신청을 할 수 없습니다.`,
                );
            }

            const matchingCount = await getMatchingCount(writer, participant);

            let participationFlag;
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });
            if (participation) {
                const { participantId, canceled, status } = participation;
                if (!canceled) {
                    throw new ConflictError('이미 참가 신청을 보낸 모임입니다.');
                }

                if (status !== 'pending') {
                    throw new ConflictError('이미 수락되거나 거절된 모임입니다.');
                }
                await ParticipantModel.update({ participantId, updateField: 'canceled', newValue: 0 });
                participationFlag = canceled;
            } else {
                await ParticipantModel.participatePost({ userId, postId, matchingCount });

                participationFlag = true;
            }
            return { message: '모임 참가 신청에 성공했습니다.', participationFlag };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('모임 참가 신청에 실패했습니다.');
            }
        }
    },
    participateCancel: async ({ userId, postId }) => {
        try {
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });
            throwNotFoundError(participation, '참가 신청 정보');

            const { participantId, canceled, status } = participation;

            if (canceled) {
                throw new ConflictError('이미 취소된 신청 정보입니다.');
            }

            if (status !== 'pending') {
                throw new ConflictError('이미 수락되거나 거절된 모임입니다.');
            }

            await ParticipantModel.update({ participantId, updateField: 'canceled', newValue: 1 });

            return { message: '신청 취소를 성공했습니다.', canceled };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 취소에 실패했습니다.');
            }
        }
    },
    checkParticipation: async ({ userId, postId }) => {
        try {
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });
            throwNotFoundError(participation, '참가 신청 정보');
            const { participantId, status, canceled } = participation;
            return { message: '신청 여부 조회에 성공했습니다.', participantId, status, canceled };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('신청 여부 조회에 실패했습니다.');
            }
        }
    },
    getParticipants: async ({ userId, postId, gender }) => {
        try {
            const post = await PostModel.getPostById(postId);
            throwNotFoundError(post, '게시글');

            const user = await UserModel.findById(userId);
            throwNotFoundError(user, '유저');
            checkAccess(post.userId, userId, '참가자 리스트 조회');

            let userWhere = {};
            if (gender) {
                userWhere.gender = gender;
            }
            const participantsList = await ParticipantModel.getParticipantsByGender({ postId, userWhere });

            return {
                message: '참가자 리스트 조회를 성공했습니다.',
                isFulled: post.isCompleted,
                participantsList,
            };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('참가자 리스트 불러오기에 실패했습니다.');
            }
        }
    },
    allow: async ({ participantId, userId }) => {
        const transaction = await db.sequelize.transaction({ autocommit: false }); // 트랜잭션 생성
        try {
            const participation = await ParticipantModel.getParticipationById(participantId);

            throwNotFoundError(participation, '참가 신청 정보');

            const { Post, User } = await checkParticipationStatus('수락', participation, userId);

            const { totalM, totalF, recruitedF, recruitedM, postId } = Post;
            const { gender } = User;

            const { fieldToUpdate, newValue, isCompleted } = await updateRecruitedValue(
                gender,
                totalM,
                totalF,
                recruitedF,
                recruitedM,
            );

            await ParticipantModel.update({ transaction, participantId, updateField: 'status', newValue: 'accepted' });
            await PostModel.update({ transaction, postId, fieldToUpdate, newValue });
            if (isCompleted) {
                await PostModel.update({ transaction, postId, fieldToUpdate: 'isCompleted', newValue: true });
            }
            await transaction.commit();

            return {
                message: '신청 수락을 성공하였습니다.',
                totalM: totalM,
                totalF: totalF,
                recruitedF: fieldToUpdate === 'recruitedF' ? newValue : recruitedF,
                recruitedM: fieldToUpdate === 'recruitedM' ? newValue : recruitedM,
            };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 수락에 실패했습니다.');
            }
        }
    },
    deny: async ({ participantId, userId }) => {
        try {
            const participation = await ParticipantModel.getParticipationById(participantId);

            throwNotFoundError(participation, '참가 신청 정보');

            await checkParticipationStatus('거절', participation, userId);

            await ParticipantModel.update({ participantId, updateField: 'status', newValue: 'rejected' });

            return { message: '신청 거절을 성공하였습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 거절을 실패했습니다.');
            }
        }
    },
    getAcceptedUsers: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            throwNotFoundError(post, '게시글');
            checkAccess(userId, post.userId, '수락한 유저 리스트 조회');
            const acceptedUsers = await ParticipantModel.getAcceptedUsers({ postId, writerId: post.userId });

            return { message: '수락한 유저 리스트 조회를 성공했습니다.', acceptedUsers };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('수락한 유저 리스트 불러오기에 실패했습니다.');
            }
        }
    },
    allowCancel: async ({ userId, postId, participantId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            const participation = await ParticipantModel.getParticipationById(participantId);
            throwNotFoundError(participation, '참가 신청 정보');
            checkAccess(userId, post.userId, '취소');

            await ParticipantModel.update({ participantId, updateField: 'status', newValue: 'pending' });

            let fieldToUpdate, newValue;
            const { User, Post } = participation;

            if (User.gender === '여') {
                fieldToUpdate = 'recruitedF';
                newValue = Post.recruitedF - 1;
            }

            if (participation.User.gender === '남') {
                fieldToUpdate = 'recruitedM';
                newValue = Post.recruitedM - 1;
            }

            await PostModel.update({ postId, fieldToUpdate, newValue });
            return { message: '수락한 유저 취소에 성공했습니다.' };
        } catch (error) {
            throw new InternalServerError('수락한 유저 취소에 실패했습니다.');
        }
    },
};
export { participantService };
