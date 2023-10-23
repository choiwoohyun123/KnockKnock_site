const UserFile = (sequelize, DataTypes) => {
    const UserFile = sequelize.define(
        'UserFile',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'UserFile',
            tableName: 'user_files',
            paranoid: false,
        },
    );
    UserFile.associate = db => {
        db.UserFile.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 UserFile 모델의 userId, targetKey는 User 모델의 userId
        db.UserFile.belongsTo(db.File, {
            foreignKey: 'fileId',
            targetKey: 'fileId',
        }); // foreignKey는 UserFile 모델의 fileId, sourceKey는 File 모델의 fileId
    };

    return UserFile;
};

export default UserFile;
