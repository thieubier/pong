// models/realization.js
module.exports = (sequelize, DataTypes) => {
    const Realization = sequelize.define('Realization', {
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Realization.associate = function(models) {
        Realization.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
        Realization.belongsTo(models.ManufacturingRange, { foreignKey: 'manufacturing_range_id', as: 'ManufacturingRange' });
        Realization.belongsTo(models.Operation, { foreignKey: 'operation_id', as: 'Operation' });
        Realization.belongsTo(models.Workstation, { foreignKey: 'workstation_id', as: 'Workstation' });
        Realization.belongsTo(models.Machine, { foreignKey: 'machine_id', as: 'Machine' });
    };

    return Realization;
};
