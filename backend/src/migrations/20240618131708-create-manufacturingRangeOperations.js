'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ManufacturingRangeOperations', {
      manufacturing_range_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ManufacturingRanges',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true
      },
      operation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Operations',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ManufacturingRangeOperations');
  }
};
