// backend/src/models/purchase.js
module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('Purchase', {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        delivery_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Purchase;
};
