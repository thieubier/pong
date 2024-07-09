// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models and add them to db object
db.User = require('./user')(sequelize, Sequelize);
db.Piece = require('./piece')(sequelize, Sequelize);
db.PieceComposition = require('./pieceComposition')(sequelize, Sequelize);
db.Supplier = require('./supplier')(sequelize, Sequelize);
db.Quotation = require('./quotation')(sequelize, Sequelize);
db.QuotationLine = require('./quotationLine')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);
db.OrderLine = require('./orderLine')(sequelize, Sequelize);
db.Purchase = require('./purchase')(sequelize, Sequelize);
db.WorkerQualification = require('./workerQualification')(sequelize, Sequelize);
db.RealizationHistory = require('./realizationHistory')(sequelize, Sequelize);
db.Operation = require('./operation')(sequelize, Sequelize);
db.ManufacturingRange = require('./manufacturingRange')(sequelize, Sequelize);
db.ManufacturingRangeOperations = require('./manufacturingRangeOperations')(sequelize, Sequelize);
db.Workstation = require('./workstation')(sequelize, Sequelize);
db.Machine = require('./machine')(sequelize, Sequelize);

// Define associations
db.PieceComposition.belongsTo(db.Piece, { as: 'ParentPiece', foreignKey: 'parent_piece_id' });
db.PieceComposition.belongsTo(db.Piece, { as: 'ComponentPiece', foreignKey: 'component_piece_id' });
db.Piece.hasMany(db.PieceComposition, { foreignKey: 'parent_piece_id', as: 'Components' });
db.Piece.hasMany(db.PieceComposition, { foreignKey: 'component_piece_id', as: 'UsedIn' });
db.Piece.belongsTo(db.Supplier, { foreignKey: 'supplier_id' });

db.Quotation.hasMany(db.QuotationLine, { as: 'QuotationLines', foreignKey: 'quotation_id' });
db.QuotationLine.belongsTo(db.Piece, { foreignKey: 'piece_id' });
db.Quotation.belongsTo(db.User, { foreignKey: 'user_id' });

db.Order.hasMany(db.OrderLine, { as: 'OrderLines', foreignKey: 'order_id' });
db.OrderLine.belongsTo(db.Piece, { foreignKey: 'piece_id' });
db.Order.belongsTo(db.User, { foreignKey: 'user_id' });

db.Purchase.belongsTo(db.Piece, { foreignKey: 'piece_id' });
db.Purchase.belongsTo(db.Supplier, { foreignKey: 'supplier_id' });

db.WorkerQualification.belongsTo(db.User, { foreignKey: 'user_id' });
db.WorkerQualification.belongsTo(db.Operation, { foreignKey: 'operation_id' });

db.RealizationHistory.belongsTo(db.Operation, { foreignKey: 'operation_id' });
db.RealizationHistory.belongsTo(db.User, { foreignKey: 'worker_id' });

db.Workstation.belongsToMany(db.Machine, { through: 'WorkstationMachines', as: 'Machines', foreignKey: 'workstation_id' });
db.Machine.belongsToMany(db.Workstation, { through: 'WorkstationMachines', as: 'Workstations', foreignKey: 'machine_id' });

db.Workstation.belongsToMany(db.User, { through: 'WorkerQualifications', as: 'QualifiedWorkers', foreignKey: 'workstation_id' });
db.User.belongsToMany(db.Workstation, { through: 'WorkerQualifications', as: 'QualifiedWorkstations', foreignKey: 'user_id' });

db.ManufacturingRange.belongsTo(db.Piece, { foreignKey: 'piece_id', as: 'Piece' });
db.ManufacturingRange.belongsTo(db.User, { foreignKey: 'supervisor_id', as: 'Supervisor' });
db.ManufacturingRange.belongsToMany(db.Operation, {
    through: 'ManufacturingRangeOperations',
    foreignKey: 'manufacturing_range_id',
    otherKey: 'operation_id',
    as: 'Operations'
});
db.Operation.belongsToMany(db.ManufacturingRange, {
    through: 'ManufacturingRangeOperations',
    foreignKey: 'operation_id',
    otherKey: 'manufacturing_range_id'
});

db.ManufacturingRange.belongsToMany(db.Workstation, {
    through: 'ManufacturingRangeWorkstations',
    as: 'Workstations',
    foreignKey: 'manufacturing_range_id'
});
db.ManufacturingRange.belongsToMany(db.Machine, {
    through: 'ManufacturingRangeMachines',
    as: 'Machines',
    foreignKey: 'manufacturing_range_id'
});

module.exports = db;
