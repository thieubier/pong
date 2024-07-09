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
      parent_piece_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pieces',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      component_piece_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
