module.exports = (sequelize, DataTypes) => {
    const PieceComposition = sequelize.define('PieceComposition', {
        parent_piece_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Pieces',
                key: 'id'
            }
        },
        component_piece_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Pieces',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    PieceComposition.associate = function(models) {
        PieceComposition.belongsTo(models.Piece, { foreignKey: 'parent_piece_id', as: 'ParentPiece' });
        PieceComposition.belongsTo(models.Piece, { foreignKey: 'component_piece_id', as: 'ComponentPiece' });
    };

    return PieceComposition;
};
