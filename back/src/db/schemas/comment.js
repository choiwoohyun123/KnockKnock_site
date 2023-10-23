const Comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
            commentId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
        },
    );
    Comment.associate = db => {
        db.Comment.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'postId',
        }); // foreignKey는 Post모델의 post_id, targetKey는 User 모델의 post_id

        db.Comment.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 Comment모델의 userId, targetKey는 User 모델의 userId
    };

    return Comment;
};

export default Comment;
