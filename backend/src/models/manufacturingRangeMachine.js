module.exports = (sequelize, DataTypes) => {
    const ManufacturingRangeMachine = sequelize.define('ManufacturingRangeMachine', {
        manufacturing_range_id: DataTypes.INTEGER,
        machine_id: DataTypes.INTEGER
    });

    return ManufacturingRangeMachine;
};
