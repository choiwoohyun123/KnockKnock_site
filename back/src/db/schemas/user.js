const User = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(40),
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(1),
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            job: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            region: {
                type: DataTypes.ENUM(
                    '서울특별시',
                    '부산광역시',
                    '대구광역시',
                    '인천광역시',
                    '광주광역시',
                    '울산광역시',
                    '세종특별자치시',
                    '경기도',
                    '강원도',
                    '충청도',
                    '전라도',
                    '경상도',
                    '제주',
                ),
                allowNull: false,
            },
            mbti: {
                type: DataTypes.ENUM(
                    'ISTJ',
                    'ISFJ',
                    'INFJ',
                    'INTJ',
                    'ISTP',
                    'ISFP',
                    'INFP',
                    'INTP',
                    'ESTP',
                    'ESFP',
                    'ENFP',
                    'ENTP',
                    'ESTJ',
                    'ESFJ',
                    'ENFJ',
                    'ENTJ',
                ),
                allowNull: true,
            },
            height: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            introduce: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
        },
    );
    User.associate = db => {
        db.User.hasMany(db.Post, { foreignKey: 'userId' }); // foreignKey는 Post 모델의 userId, sourceKey는 User 모델의 userId
        db.User.hasMany(db.Comment, { foreignKey: 'userId' }); // foreignKey는 Comment 모델의 userId, sourceKey는 User 모델의 userId
        db.User.hasMany(db.ChatRoom, { foreignKey: 'firstId' }); // foreignKey는 Message 모델의 send_id, sourceKey는 User 모델의 userId
        db.User.hasMany(db.ChatRoom, { foreignKey: 'secondId' }); // foreignKey는 Message 모델의 recieve_id, sourceKey는 User 모델의 userId
        db.User.hasMany(db.Participant, { foreignKey: 'userId' }); // foreignKey는 Participant 모델의 userId, sourceKey는 User 모델의 userId
        db.User.hasMany(db.UserTag, { foreignKey: 'userId' });
        db.User.hasMany(db.UserFile, { foreignKey: 'userId' });
        db.User.hasMany(db.UserCard, { foreignKey: 'userId' });
    };

    return User;
};

export default User;
