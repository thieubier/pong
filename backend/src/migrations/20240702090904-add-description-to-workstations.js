'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Workstations', 'description', {
      type: Sequelize.STRING,
      allowNull: true, // Permettre les valeurs nulles
      defaultValue: 'Description par défaut' // Ajouter une valeur par défaut
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Workstations', 'description');
  }
};
