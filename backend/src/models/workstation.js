// models/workstation.js
module.exports = (sequelize, DataTypes) => {
    const Workstation = sequelize.define('Workstation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Workstation.associate = function(models) {
        Workstation.belongsToMany(models.Machine, {
            through: 'WorkstationMachines',
            as: 'Machines',
            foreignKey: 'workstation_id'
        });
        Workstation.belongsToMany(models.User, {
            through: 'WorkerQualifications',
            as: 'QualifiedWorkers',
            foreignKey: 'workstation_id'
        });
        Workstation.belongsToMany(models.ManufacturingRange, {
            through: 'ManufacturingRangeWorkstations',
            as: 'ManufacturingRanges',
            foreignKey: 'workstation_id'
        });
    };

    return Workstation;
};
