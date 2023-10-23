const Participant = (sequelize, DataTypes) => {
    const Participant = sequelize.define(
        'Participant',
        {
            participantId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            canceled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            status: {
                type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
                allowNull: false,
                defaultValue: 'pending',
            },
            matchingCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Participant',
            tableName: 'participants',
            paranoid: false,
        },
    );
    Participant.associate = db => {
        // foreignKey는 Participant모델의 userId, targetKey는 User 모델의 userIdd
        db.Participant.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        });
        // foreignKey는 Participant모델의 postId, targetKey는 Post 모델의 postId
        db.Participant.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'postId',
        });
    };

    return Participant;
};

export default Participant;
