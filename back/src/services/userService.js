import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    ConflictError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    InternalServerError,
} from '../middlewares/errorMiddleware.js';
import { UserModel } from '../db/models/UserModel.js';
import { FileModel } from '../db/models/FileModel.js';
import { db } from '../db/index.js';
import { calculateKoreanAge, extensionSplit } from '../utils/userFunction.js';

const userService = {
    // 유저 생성
    createUser: async ({ newUser }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const { hobby, personality, ideal, profileImage, ...userInfo } = newUser;

            // 이메일 중복 확인
            const userByEmail = await UserModel.findByEmail(newUser.email);
            if (userByEmail) {
                throw new ConflictError('이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.');
            }
            // 닉네임 중복 확인
            const userByNickname = await UserModel.findByNickname(newUser.nickname);
            if (userByNickname) {
                throw new ConflictError('이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요.');
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(userInfo.password, parseInt(process.env.PW_HASH_COUNT));
            userInfo.password = hashedPassword;

            userInfo.age = calculateKoreanAge(userInfo.birthday); // birthday로 한국 나이 계산하기
            if (20 > userInfo.age || userInfo.age > 40) {
                throw new ConflictError('20세부터 40세까지만 가입 가능합니다.');
            }

            const createdUser = await UserModel.create(userInfo, transaction);

            const tagsCreate = async (tag, tagCategoryId) => {
                // 태그 생성
                if (tag && tag.length > 0) {
                    // 태그이름 배열을 태그아이디(정수) 배열로 변경, [(tagId,userId)] 형태로 변경
                    const newTags = await Promise.all(
                        tag.map(async tagName => {
                            const tagId = await UserModel.findTagId(tagName, tagCategoryId);
                            return { userId: createdUser.userId, tagId: tagId.tagId, tagCategoryId };
                        }),
                    );
                    // userTags 테이블에 데이터 생성
                    await UserModel.bulkCreateTags(newTags, transaction);
                }
            };

            await tagsCreate(hobby, 1);
            await tagsCreate(personality, 2);
            await tagsCreate(ideal, 3);

            // 유저의 프로필 이미지를 이미지 테이블에 저장
            if (profileImage) {
                const fileExtension = extensionSplit(profileImage[1]);
                await FileModel.createUserImage(
                    profileImage[0], // category
                    profileImage[1], // url
                    fileExtension,
                    createdUser.userId,
                    transaction,
                );
            }

            await transaction.commit();

            return {
                message: '회원가입에 성공했습니다.',
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new BadRequestError('회원가입에 실패했습니다.');
            }
        }
    },
    //유저 로그인
    getUser: async ({ email, password }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = await UserModel.findByEmail(email);

            if (!user) {
                throw new NotFoundError('가입 내역이 없는 이메일입니다. 다시 한 번 확인해 주세요');
            }

            if (user.isDeleted === true) {
                throw new BadRequestError('이미 탈퇴한 회원입니다.');
            }

            const correctPasswordHash = user.password;
            const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

            if (!isPasswordCorrect) {
                throw new UnauthorizedError('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
            }

            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign(
                {
                    userId: user.userId,
                    email: user.email,
                    name: user.nickname,
                },
                secretKey,
            );

            await transaction.commit();

            return {
                message: '로그인에 성공했습니다.',
                token,
                userId: user.userId,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new UnauthorizedError('로그인에 실패하였습니다.');
            }
        }
    },
    // 유저 로그인 확인
    loginCheck: async ({ userId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = await UserModel.findById(userId);

            if (!user || user.isDeleted === true) {
                throw new NotFoundError('회원의 정보를 찾을 수 없습니다.');
            }

            await transaction.commit();
            return {
                message: '정상적인 유저입니다.',
                userId: user.userId,
                email: user.email,
                nickname: user.nickname,
                url: user.UserFiles?.[0]?.File?.url,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    },
    // 유저 정보 조회
    getUserById: async ({ userId }) => {
        try {
            const user = await UserModel.findById(userId);

            if (!user || user.isDeleted === true) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            let hobby = [];
            let personality = [];
            let ideal = [];
            for (const userTag of user.UserTags) {
                if (userTag.Tag.tagCategoryId === 1) {
                    hobby.push(userTag.Tag.tagName);
                } else if (userTag.Tag.tagCategoryId === 2) {
                    personality.push(userTag.Tag.tagName);
                } else {
                    ideal.push(userTag.Tag.tagName);
                }
            }

            return {
                message: '회원 정보 조회를 성공했습니다.',
                userId: user.userId,
                email: user.email,
                name: user.name,
                nickname: user.nickname,
                gender: user.gender,
                brthday: user.birthday,
                age: user.age,
                job: user.job,
                region: user.region,
                mbti: user.mbti,
                height: user.height,
                introduce: user.introduce,
                hobby,
                personality,
                ideal,
                profileImage: user.UserFiles?.[0]?.File?.url,
            };
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 정보를 조회하는 데 실패했습니다.');
            }
        }
    },
    // 유저 랜덤으로 6명 네트워크페이지에 불러오기
    getRandomUsers: async userId => {
        try {
            const user = await UserModel.findById(userId);

            if (!user || user.isDeleted === true) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            let genderToFind; // 로그인 유저가 남자면 여자를 보여기 그 반대도 마찬가지
            if (user.gender === '남') {
                genderToFind = '여';
            } else {
                genderToFind = '남';
            }

            const randomUsers = await UserModel.findRandomUsers(genderToFind, 6);

            if (!randomUsers || randomUsers.length === 0) {
                throw new NotFoundError('유저들을 찾을 수 없습니다..');
            }

            return {
                message: '랜덤으로 유저 6명 조회하기 성공!',
                randomUsers,
            };
        } catch (error) {
            throw new BadRequestError('랜덤으로 유저들을 조회하는 데 실패했습니다.');
        }
    },
    // 내가 작성한 게시글 불러오기
    getMyPosts: async ({ userId }) => {
        try {
            const posts = await UserModel.findMyPosts(userId);

            if (!posts) {
                throw new NotFoundError('내가 작성한 게시글을 찾을 수 없습니다.');
            }

            return {
                message: '내가 작성한 게시글 조회 성공!',
                posts,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('내가 작성한 게시글을 불러오기 실패했습니다.');
            }
        }
    },
    // 내가 참여한 게시글 불러오기
    getMyParticipants: async ({ userId }) => {
        try {
            const participants = await UserModel.findMyParticipants(userId);

            if (!participants) {
                throw new NotFoundError('내가 참여한 게시글을 찾을 수 없습니다.');
            }
            return {
                message: '내가 참여한 게시글 조회 성공!',
                participants,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('내가 참여한 게시글을 불러오기 실패했습니다.');
            }
        }
    },
    // 유저 정보 수정
    updateUser: async ({ userId, updateUserInfo }) => {
        let transaction;

        try {
            transaction = await db.sequelize.transaction();

            const { hobby, personality, ideal, profileImage, backgroundImage, ...updateData } = updateUserInfo;

            const profileFileExtension = extensionSplit(profileImage[1]);
            const backgroundFileExtension = extensionSplit(backgroundImage[1]);
            const user = await UserModel.findById(userId);

            if (!user || user.isDeleted === true) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            const userByNickname = await UserModel.findByNickname(updateData.nickname);
            if (user.nickname !== updateData.nickname && userByNickname) {
                throw new ConflictError('이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요.');
            }

            await UserModel.update({ userId, updateData });

            const updatedUser = await UserModel.findById(userId);

            const tagsUpdate = async (tag, tagCategoryId) => {
                if (tag.length == 0) {
                    await UserModel.deleteTags(userId, tagCategoryId);
                }
                // 태그 수정
                if (tag && tag.length > 0) {
                    // 태그 카테고리와 일치하는 태그들 삭제
                    await UserModel.deleteTags(userId, tagCategoryId);

                    // 태그이름 배열을 태그아이디(정수) 배열로 변경, [{ userId, tagId }] 형태로 변경
                    const newTags = await Promise.all(
                        tag.map(async tagName => {
                            const tagId = await UserModel.findTagId(tagName, tagCategoryId);
                            return { userId, tagId: tagId.tagId, tagCategoryId };
                        }),
                    );

                    // 수정할 태그들 userTags 테이블에 데이터 생성
                    await UserModel.bulkCreateTags(newTags, transaction);
                }
            };

            await tagsUpdate(hobby, 1);
            await tagsUpdate(personality, 2);
            await tagsUpdate(ideal, 3);

            let file = await FileModel.findFileByUserId(userId, profileImage[0]);

            if (file && profileImage) {
                await FileModel.updateUserImage(
                    file.fileId,
                    profileImage[0], // category
                    profileImage[1], // url
                    profileFileExtension,
                    transaction,
                );
            } else if (!file) {
                await FileModel.createUserImage(
                    profileImage[0], // category
                    profileImage[1], // url
                    profileFileExtension,
                    userId,
                    transaction,
                );
            } else {
                throw new NotFoundError('유저의 프로필 이미지를 수정하는 데 실패했습니다.');
            }

            file = await FileModel.findFileByUserId(userId, backgroundImage[0]);

            if (file && backgroundImage) {
                await FileModel.updateUserImage(
                    file.fileId,
                    backgroundImage[0], // category
                    backgroundImage[1], // url
                    backgroundFileExtension,
                    transaction,
                );
            } else if (!file) {
                await FileModel.createUserImage(
                    backgroundImage[0], // category
                    backgroundImage[1], // url
                    backgroundFileExtension,
                    userId,
                    transaction,
                );
            } else {
                throw new NotFoundError('유저의 배경 이미지를 수정하는 데 실패했습니다.');
            }

            await transaction.commit();

            return {
                message: '회원 정보가 수정되었습니다.',
                updatedUser: {
                    nickname: updatedUser.nickname,
                    age: updatedUser.age,
                    job: updatedUser.job,
                    region: updatedUser.region,
                    profileImage,
                    backgroundImage,
                    mbti: updatedUser.mbti,
                    height: updatedUser.height,
                    introduce: updatedUser.introduce,
                    hobby,
                    personality,
                    ideal,
                },
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError || error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('회원 정보를 수정하는 데 실패했습니다.');
            }
        }
    },
    // 유저 정보 삭제
    deleteUser: async ({ userId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const user = await UserModel.findById(userId);

            if (!user || user.isDeleted === true) {
                throw new NotFoundError('회원의 정보를 찾을 수 없습니다.');
            }

            // softdelete로 삭제하는 기능
            await UserModel.delete({ userId });

            await transaction.commit();
            return { message: '회원이 성공적으로 탈퇴하였습니다.' };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 탈퇴하는 데 실패했습니다.');
            }
        }
    },
    // 유저 비밀번호 검증 후 변경
    updatePassword: async ({ userId, currentPassword, newPassword }) => {
        try {
            const user = await UserModel.findById(userId);

            if (!user || user.isDeleted === true) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            const { password } = await UserModel.findPassword(userId); // DB에 있는 현재 Hash 비밀번호
            const isPasswordCorrect = await bcrypt.compare(currentPassword, password); // 현재 비밀번호와 현재 해쉬 비밀번호 비교
            if (!isPasswordCorrect) {
                throw new UnauthorizedError('현재 비밀번호와 일치하지 않습니다. 다시 한 번 확인해주세요.');
            }

            if (currentPassword === newPassword) {
                throw new ConflictError('현재 비밀번호와 새로운 비밀번호가 같습니다.');
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.PW_HASH_COUNT));
            const updateData = { password: hashedPassword };
            await UserModel.update({ userId, updateData });

            return { message: '회원 비밀번호 변경에 성공했습니다.' };
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('회원 비밀번호 변경에 실패했습니다.');
            }
        }
    },
};

export { userService };
