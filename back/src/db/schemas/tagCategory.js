const TagCategory = (sequelize, DataTypes) => {
    const TagCategory = sequelize.define(
        'TagCategory',
        {
            tagCategoryId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tagCategoryName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'TagCategory',
            tableName: 'tag_categories',
            paranoid: false,
        },
    );
    TagCategory.associate = db => {
        db.TagCategory.hasMany(db.Tag, {
            foreignKey: 'tagCategoryId',
            sourceKey: 'tagCategoryId',
        }); // foreignKey는 Tag 모델의 tag_categoryId, sourceKey는 TagCategory 모델의 tag_categoryId
        db.TagCategory.hasMany(db.UserTag, {
            foreignKey: 'tagCategoryId',
            sourceKey: 'tagCategoryId',
        });
    };

    return TagCategory;
};

export default TagCategory;
