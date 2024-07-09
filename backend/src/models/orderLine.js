// backend/src/models/orderLine.js
module.exports = (sequelize, DataTypes) => {
    const OrderLine = sequelize.define('OrderLine', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return OrderLine;
};
