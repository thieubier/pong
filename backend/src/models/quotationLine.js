// backend/src/models/quotationLine.js
module.exports = (sequelize, DataTypes) => {
    const QuotationLine = sequelize.define('QuotationLine', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return QuotationLine;
};
