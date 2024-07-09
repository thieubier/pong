// backend/src/seeders/[timestamp]-demo-quotations.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Quotations', null, {}); // Supprimer toutes les anciennes entrées

    return queryInterface.bulkInsert('Quotations', [
      {
        quotation_date: new Date(),
        expiry_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Ajouter une valeur pour expiry_date
        total_price: 1000.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quotation_date: new Date(),
        expiry_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Ajouter une valeur pour expiry_date
        total_price: 1500.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Quotations', null, {});
  }
};
