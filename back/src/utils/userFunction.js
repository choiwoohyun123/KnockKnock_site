const fieldsToUpdate = {
    nickname: 'nickname',
    job: 'job',
    region: 'region',
    mbti: 'mbti',
    height: 'height',
    introduce: 'introduce',
};

// birthday를 나이로 계산해서 데이터베이스에 넣기
const calculateKoreanAge = birthday => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear() + 1;
    // userInfo객체에 age값을 추가하기
    return age;
};

// 파일명에서 확장자 뽑아내기
const extensionSplit = url => {
    const splitUrl = url.split('.');
    const fileExtension = splitUrl[splitUrl.length - 1];
    return fileExtension;
};

export { fieldsToUpdate, calculateKoreanAge, extensionSplit };
