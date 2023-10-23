const CardFile = (sequelize, DataTypes) => {
    const CardFile = sequelize.define(
        'CardFile',
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
            modelName: 'CardFile',
            tableName: 'card_files',
            paranoid: false,
        },
    );
    CardFile.associate = db => {
        db.CardFile.belongsTo(db.Card, {
            foreignKey: 'cardId',
            targetKey: 'cardId',
        }); // foreignKey는 CardFile 모델의 postId, sourceKey는 Post 모델의 postId
        db.CardFile.belongsTo(db.File, {
            foreignKey: 'fileId',
            targetKey: 'fileId',
        }); // foreignKey는 CardFile 모델의 fileId, sourceKey는 File 모델의 fileId
    };

    return CardFile;
};

export default CardFile;
