const Card = (sequelize, DataTypes) => {
    const Card = sequelize.define(
        'Card',
        {
            cardId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            content: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Card',
            tableName: 'cards',
            paranoid: false,
        },
    );
    Card.associate = db => {
        db.Card.hasOne(db.CardFile, {
            foreignKey: 'cardId',
        });
        db.Card.hasOne(db.UserCard, {
            foreignKey: 'cardId',
            targetKey: 'cardId',
        });
    };

    return Card;
};

export default Card;
