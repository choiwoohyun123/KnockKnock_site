import { Router } from 'express';
import { commentController } from '../controllers/commentController.js';
import { addCommentValidationRules, addCommentValidate } from '../middlewares/commentVaildate.js';
import { updateCommentValidationRules, updateCommentValidate } from '../middlewares/updateCommentValidate.js';
import { commentParamsValidate } from '../middlewares/commentParamsValidate.js';
import { getCommentValidate } from '../middlewares/getCommentValidate.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const commentRouter = Router();
commentRouter.use(loginRequired);

// 댓글 작성
commentRouter.post('/:postId', addCommentValidationRules, addCommentValidate, commentController.create);

//댓글 수정
commentRouter.put('/:postId/:commentId', updateCommentValidationRules, updateCommentValidate, commentController.update);

// 개별 게시글 댓글 조회
commentRouter.get('/:postId', getCommentValidate, commentController.getComment);

// 댓글 삭제
commentRouter.delete('/:postId/:commentId', commentParamsValidate, commentController.delete);

export { commentRouter };
