const UserCard = (sequelize, DataTypes) => {
    const UserCard = sequelize.define(
        'UserCard',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'UserCard',
            tableName: 'user_cards',
            paranoid: false,
        },
    );
    UserCard.associate = db => {
        db.UserCard.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 UserTag 모델의 userId, targetKey는 User 모델의 userId
        db.UserCard.belongsTo(db.Card, {
            foreignKey: 'cardId',
        });
    };

    return UserCard;
};

export default UserCard;
