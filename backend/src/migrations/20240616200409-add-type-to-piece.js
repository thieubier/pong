'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Créez le type ENUM
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
      CREATE TYPE "enum_Pieces_type" AS ENUM ('finished_piece', 'intermediate_piece', 'raw_material', 'purchased_piece');
      EXCEPTION
      WHEN duplicate_object THEN null;
      END $$;
    `);

    // Ajoutez la colonne `type` avec une valeur par défaut
    await queryInterface.addColumn('Pieces', 'type', {
      type: Sequelize.ENUM('finished_piece', 'intermediate_piece', 'raw_material', 'purchased_piece'),
      allowNull: false,
      defaultValue: 'raw_material' // Remplacez par la valeur par défaut souhaitée
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimez la colonne `type` de la table `Pieces`
    await queryInterface.removeColumn('Pieces', 'type');

    // Supprimez le type ENUM
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Pieces_type";');
  }
};
