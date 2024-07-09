'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ManufacturingRangeOperations', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ManufacturingRangeOperations', 'duration');
  }
};
