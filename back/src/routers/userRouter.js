import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { loginValidate, loginValidationRules } from '../middlewares/loginValidate.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { RegisterValidationRules, registerValidate } from '../middlewares/registerValidate.js';
import { setPasswordValidationRules, setPasswordValidate } from '../middlewares/setPasswodValidate.js';
import { userParamsValidate } from '../middlewares/userParamsValidate.js';

const userRouter = Router();

// 회원가입
userRouter.post('/register', RegisterValidationRules, registerValidate, userController.register);

// 로그인
userRouter.post('/login', loginValidationRules, loginValidate, userController.login);

// 로그인 확인
userRouter.use(loginRequired);

// 로그인 검증
userRouter.get('/isLogin', userController.isLogin);

// 현재 로그인한 유저 정보 불러오기
userRouter.get('/mypage', userController.getCurrentUserInfo);

// 유저 정보 수정하기(별명, 설명)
userRouter.put('/mypage', userController.update);

// 유저 정보 삭제하기
userRouter.delete('/mypage', userController.delete);

// 유저 비밀번호 확인, 변경
userRouter.put('/mypage/password', setPasswordValidationRules, setPasswordValidate, userController.updatePassword);

// 현재 로그인한 유저가 작성한 게시글 모두 불러오기
userRouter.get('/mypage/posts', userController.getCurrentUserPosts);

// 현재 로그인한 유저의 참여한 게시글 모두 불러오기
userRouter.get('/mypage/participants', userController.getCurrentUserParticipants);

// 오늘의 낙낙(네트워크)페이지 - 랜덤으로 6명 유저 정보 불러오기
userRouter.get('/network', userController.getRandomUsersInfo);

// 유저 정보 불러오기
userRouter.get('/:userId', userParamsValidate, userController.getOtherUserInfo); // yourpage 였던 API모두 여기 사용하세요

export { userRouter };
