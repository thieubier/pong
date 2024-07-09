module.exports = (sequelize, DataTypes) => {
    const Piece = sequelize.define('Piece', {
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('finished_piece', 'intermediate_piece', 'raw_material', 'purchased_piece'),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Piece.associate = function(models) {
        Piece.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
        Piece.hasMany(models.PieceComposition, { foreignKey: 'parent_piece_id', as: 'Components' });
        Piece.hasMany(models.PieceComposition, { foreignKey: 'component_piece_id', as: 'UsedIn' });
    };

    return Piece;
};
