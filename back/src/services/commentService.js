import { CommentModel } from '../db/models/CommentModel.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { PostModel } from '../db/models/PostModel.js';
import { NotFoundError, InternalServerError, UnauthorizedError } from '../middlewares/errorMiddleware.js';

const commentService = {
    createComment: async ({ userId, postId, content }) => {
        try {
            const participant = await ParticipantModel.getParticipationByUserId({ userId, postId });
            if (!participant) {
                throw new NotFoundError('해당 id의 신청 정보가 없습니다. ');
            }
            if (participant.status !== 'accepted') {
                throw new UnauthorizedError('신청이 수락된 유저에게만 권한이 있습니다');
            }

            const { commentId } = await CommentModel.create({ userId, postId, content });

            return {
                commentId,
                message: '댓글 추가하기에 성공했습니다.',
            };
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 작성하기에 실패했습니다.');
            }
        }
    },

    updateComment: async ({ userId, postId, commentId, content }) => {
        try {
            const comment = await CommentModel.findByCommentId({ postId, commentId });

            if (!comment) {
                throw new NotFoundError('요청한 댓글의 정보를 찾을 수 없습니다.');
            }

            if (comment.userId !== userId) {
                throw new UnauthorizedError('작성한 유저에게 권한이 있습니다.');
            }

            await CommentModel.update({ userId, postId, commentId, content });

            return {
                message: '댓글 수정하기에 성공하셨습니다.',
            };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
                throw error;
            } else {
                new InternalServerError('댓글 수정하기에 실패했습니다.');
            }
        }
    },

    deleteComment: async ({ userId, postId, commentId }) => {
        try {
            const comment = await CommentModel.findByCommentId({ postId, commentId });

            if (!comment) {
                throw new NotFoundError('이미 삭제된 댓글입니다.');
            }

            if (comment.userId !== userId) {
                throw new UnauthorizedError('작성한 유저에게 권한이 있습니다.');
            }

            await CommentModel.delete({ postId, commentId });

            return {
                message: '댓글 삭제하기에 성공하셨습니다.',
            };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
                throw error;
            } else {
                new InternalServerError('댓글 삭제하기에 실패했습니다.');
            }
        }
    },

    getComment: async ({ userId, postId, cursor, limit }) => {
        try {
            let commentList = [];

            const post = await PostModel.getPostById(postId);
            const participant = await ParticipantModel.getParticipationByUserId({ userId, postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

            if (!participant) {
                throw new NotFoundError('해당 id의 신청 정보가 없습니다. ');
            }

            if (participant.status !== 'accepted') {
                throw new UnauthorizedError('신청이 수락된 유저에게만 권한이 있습니다');
            }

            // cursor == 0 이면, 처음으로 댓글 불러오기.
            if (cursor == 0) {
                commentList = await CommentModel.recentComment({ postId, limit });
                // cursor == -1 이면, 모든 댓글 불러오기 끝.
            } else if (cursor == -1) {
                commentList = '전체 댓글 조회가 끝났습니다.';
            } else {
                commentList = await CommentModel.getComment({ postId, cursor, limit });
            }
            return {
                message: '게시글 댓글 불러오기에 성공하셨습니다.',
                commentList,
            };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
                throw error;
            } else {
                new InternalServerError('게시글 댓글 불러오기에 실패했습니다.');
            }
        }
    },
};

export { commentService };
