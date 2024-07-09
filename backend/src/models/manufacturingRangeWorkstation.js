module.exports = (sequelize, DataTypes) => {
    const ManufacturingRangeWorkstation = sequelize.define('ManufacturingRangeWorkstation', {
        manufacturing_range_id: DataTypes.INTEGER,
        workstation_id: DataTypes.INTEGER
    });

    return ManufacturingRangeWorkstation;
};
