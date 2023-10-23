const UserTag = (sequelize, DataTypes) => {
    const UserTag = sequelize.define(
        'UserTag',
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
            modelName: 'UserTag',
            tableName: 'user_tags',
            paranoid: false,
        },
    );
    UserTag.associate = db => {
        db.UserTag.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 UserTag 모델의 userId, targetKey는 User 모델의 userId
        db.UserTag.belongsTo(db.Tag, {
            foreignKey: 'tagId',
            targetKey: 'tagId',
        }); // foreignKey는 UserTag 모델의 tagId, sourceKey는 Tag 모델의 tagId
        db.UserTag.belongsTo(db.TagCategory, {
            foreignKey: 'tagCategoryId',
            targetKey: 'tagCategoryId',
        }); // foreignKey는 UserTag 모델의 tagId, sourceKey는 Tag 모델의 tagId
    };

    return UserTag;
};

export default UserTag;
