'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PieceCompositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pieceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pieces',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      componentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pieces',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PieceCompositions');
  }
};
