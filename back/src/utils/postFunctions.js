import { BadRequestError } from '../middlewares/errorMiddleware.js';

const setRecruitedValue = async (user, postInfo) => {
    const { gender } = user;
    if (gender === '여') {
        postInfo.recruitedF = 1;
    }

    if (gender === '남') {
        postInfo.recruitedM = 1;
    }
};

const fieldsToUpdate = {
    title: 'title',
    content: 'content',
    type: 'type',
    place: 'place',
    totalM: 'totalM',
    totalF: 'totalF',
    meetingTime: 'meetingTime',
};

const compareTotalRecrutied = (post, updateValue) => {
    if (updateValue.totalM) {
        if (post.recruitedM > updateValue.totalM) {
            throw new BadRequestError('현재 모집된 인원보다 적게 수정할 수 없습니다.');
        }
    }
    if (updateValue.totalF) {
        if (post.recruitedF > updateValue.totalF) {
            throw new BadRequestError('현재 모집된 인원보다 적게 수정할 수 없습니다.');
        }
    }
};

export { setRecruitedValue, fieldsToUpdate, compareTotalRecrutied };
