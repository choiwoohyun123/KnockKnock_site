const Post = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            postId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            place: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            meetingTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            isCompleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            totalM: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalF: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recruitedM: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            recruitedF: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
        },
    );
    Post.associate = db => {
        db.Post.hasMany(db.Comment, { foreignKey: 'postId', sourceKey: 'postId' }); // foreignKey는 Post모델의 postId, sourceKey는 User 모델의 postId
        db.Post.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' }); // foreignKey는 Post모델의 userId, targetKey는 User 모델의 userId
        db.Post.hasMany(db.Participant, {
            foreignKey: 'postId',
            sourceKey: 'postId',
        }); // foreignKey는 Participant모델의 postId, sourceKey는 Post 모델의 postId
        db.Post.hasMany(db.PostFile, { foreignKey: 'postId' });
    };

    return Post;
};

export default Post;
