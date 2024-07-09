// backend/src/seeders/[timestamp]-demo-pieces.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pieces', null, {}); // Supprimer toutes les anciennes entrées

    return queryInterface.bulkInsert('Pieces', [
      {
        reference: 'REF001',
        label: 'Piece A',
        description: 'Description for Piece A',
        price: 50.0,
        type: 'finished_piece', // Utiliser une valeur valide pour l'énumération 'type'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reference: 'REF002',
        label: 'Piece B',
        description: 'Description for Piece B',
        price: 75.0,
        type: 'intermediate_piece', // Utiliser une valeur valide pour l'énumération 'type'
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pieces', null, {});
  }
};
