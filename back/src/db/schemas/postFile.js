const PostFile = (sequelize, DataTypes) => {
    const PostFile = sequelize.define(
        'PostFile',
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
            modelName: 'PostFile',
            tableName: 'post_files',
            paranoid: false,
        },
    );
    PostFile.associate = db => {
        db.PostFile.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'postId',
        }); // foreignKey는 PostFile 모델의 postId, sourceKey는 Post 모델의 postId
        db.PostFile.belongsTo(db.File, {
            foreignKey: 'fileId',
            targetKey: 'fileId',
        }); // foreignKey는 PostFile 모델의 fileId, sourceKey는 File 모델의 fileId
    };

    return PostFile;
};

export default PostFile;
