// backend/src/models/quotation.js
module.exports = (sequelize, DataTypes) => {
    const Quotation = sequelize.define('Quotation', {
        quotation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Quotation;
};
