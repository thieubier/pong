// backend/src/models/workerQualification.js
module.exports = (sequelize, DataTypes) => {
    const WorkerQualification = sequelize.define('WorkerQualification', {
        user_id: { // Use user_id instead of worker_id
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workstation_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    WorkerQualification.associate = function(models) {
        WorkerQualification.belongsTo(models.Workstation, { foreignKey: 'workstation_id' });
        WorkerQualification.belongsTo(models.User, { foreignKey: 'user_id' }); // Use User instead of Worker
    };

    return WorkerQualification;
};
