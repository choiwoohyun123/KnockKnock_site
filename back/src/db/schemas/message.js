const Message = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            messageId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            senderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Message',
            tableName: 'messages',
            paranoid: false,
        },
    );
    Message.associate = db => {
        db.Message.belongsTo(db.ChatRoom, {
            foreignKey: 'chatId',
            targetKey: 'chatId',
        });
    };

    return Message;
};

export default Message;
