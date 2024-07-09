module.exports = (sequelize, DataTypes) => {
    const RealizationHistory = sequelize.define('RealizationHistory', {
        operation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Operations',
                key: 'id'
            }
        },
        worker_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Assuming worker is a user
                key: 'id'
            }
        },
        workstation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'WorkStations',
                key: 'id'
            }
        },
        machine_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Machines',
                key: 'id'
            }
        },
        time_spent: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    RealizationHistory.associate = function(models) {
        RealizationHistory.belongsTo(models.Operation, {
            foreignKey: 'operation_id',
            as: 'operation'
        });
        RealizationHistory.belongsTo(models.User, {
            foreignKey: 'worker_id',
            as: 'worker'
        });
        RealizationHistory.belongsTo(models.WorkStation, {
            foreignKey: 'workstation_id',
            as: 'workStation'
        });
        RealizationHistory.belongsTo(models.Machine, {
            foreignKey: 'machine_id',
            as: 'machine'
        });
    };

    return RealizationHistory;
};
