const File = (sequelize, DataTypes) => {
    const File = sequelize.define(
        'File',
        {
            fileId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            category: {
                type: DataTypes.ENUM('profile', 'background', 'post', 'card'),
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            extension: {
                type: DataTypes.ENUM('jpg', 'JPG', 'png', 'PNG', 'jpeg', 'jfif'),
            },
        },
        {
            sequelize,
            timestamps: true, // created_at, updated_at  true: 사용 할겁니다, false: 사용안할 겁니다.
            underscored: true,
            modelName: 'File',
            tableName: 'files',
            paranoid: false, // deleted_at  true: 사용 할겁니다, false: 사용안할 겁니다.
        },
    );
    File.associate = db => {
        db.File.hasOne(db.UserFile, { foreignKey: 'fileId' }); // foreignKey는 File 모델의 userId, sourceKey는 UserFile 모델의 fileId
        db.File.hasOne(db.PostFile, { foreignKey: 'fileId' }); // foreignKey는 File 모델의 userId, sourceKey는 PostFile 모델의 fileId
        db.File.hasOne(db.CardFile, { foreignKey: 'fileId' });
    };

    return File;
};

export default File;
