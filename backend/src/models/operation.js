module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define('Operation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Operation.associate = function(models) {
        Operation.belongsToMany(models.ManufacturingRange, {
            through: 'ManufacturingRangeOperations',
            foreignKey: 'operation_id',
            otherKey: 'manufacturing_range_id',
            as: 'ManufacturingRanges'
        });
    };

    return Operation;
};
