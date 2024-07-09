// models/machine.js
module.exports = (sequelize, DataTypes) => {
    const Machine = sequelize.define('Machine', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Machine.associate = function(models) {
        Machine.belongsToMany(models.Workstation, {
            through: 'WorkstationMachines',
            as: 'Workstations',
            foreignKey: 'machine_id'
        });
        Machine.belongsToMany(models.ManufacturingRange, {
            through: 'ManufacturingRangeMachines',
            as: 'ManufacturingRanges',
            foreignKey: 'machine_id'
        });
    };

    return Machine;
};
