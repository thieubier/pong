// models/manufacturingRange.js
module.exports = (sequelize, DataTypes) => {
    const ManufacturingRange = sequelize.define('ManufacturingRange', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piece_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        supervisor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    ManufacturingRange.associate = function(models) {
        ManufacturingRange.belongsTo(models.Piece, { foreignKey: 'piece_id', as: 'Piece' });
        ManufacturingRange.belongsTo(models.User, { foreignKey: 'supervisor_id', as: 'Supervisor' });
        ManufacturingRange.belongsToMany(models.Operation, {
            through: 'ManufacturingRangeOperations',
            foreignKey: 'manufacturing_range_id',
            otherKey: 'operation_id',
            as: 'Operations'
        });
        ManufacturingRange.belongsToMany(models.Workstation, {
            through: 'ManufacturingRangeWorkstations',
            as: 'Workstations',
            foreignKey: 'manufacturing_range_id'
        });
        ManufacturingRange.belongsToMany(models.Machine, {
            through: 'ManufacturingRangeMachines',
            as: 'Machines',
            foreignKey: 'manufacturing_range_id'
        });
    };

    return ManufacturingRange;
};
