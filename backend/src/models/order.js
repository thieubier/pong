// backend/src/models/order.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Order;
};
