module.exports = (sequelize, DataTypes) => {
    const WorkstationMachine = sequelize.define('WorkstationMachine', {
        workstation_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Workstations',
                key: 'id'
            },
            allowNull: false
        },
        machine_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Machines',
                key: 'id'
            },
            allowNull: false
        }
    });

    return WorkstationMachine;
};
