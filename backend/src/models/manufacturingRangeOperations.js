module.exports = (sequelize, DataTypes) => {
    const ManufacturingRangeOperations = sequelize.define('ManufacturingRangeOperations', {
        manufacturing_range_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ManufacturingRanges',
                key: 'id'
            },
            allowNull: false
        },
        operation_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Operations',
                key: 'id'
            },
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return ManufacturingRangeOperations;
};
