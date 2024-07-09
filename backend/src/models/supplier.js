// backend/src/models/supplier.js
module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_info: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Supplier;
};
