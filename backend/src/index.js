require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');
const pieceRoutes = require('./routes/piece');
const quotationRoutes = require('./routes/quotation');
const orderRoutes = require('./routes/order');
const purchaseRoutes = require('./routes/purchase');
const qualificationRoutes = require('./routes/qualification');
const realizationRoutes = require('./routes/realization');
const operationRoutes = require('./routes/operation');
const userRoutes = require('./routes/user');
const manufacturingRangeRoutes = require('./routes/manufacturingRange');
const workStationRoutes = require('./routes/workStation'); // New route
const machineRoutes = require('./routes/machine'); // New route
const realizationHistoryRoutes = require('./routes/realizationHistory'); // New route

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    const begin = new Date();
    res.on('finish', () => {
        const end = new Date();
        const requestDurationMs = end - begin;
        console.log(`[${begin.toISOString()}] ${req.method} to ${req.url} took ${requestDurationMs}ms`);
    });
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', routes);
app.use('/api/pieces', pieceRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/realizations', realizationRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/manufacturing-ranges', manufacturingRangeRoutes);
app.use('/api/workstations', workStationRoutes); // New route
app.use('/api/machines', machineRoutes); // New route
app.use('/api/realization-histories', realizationHistoryRoutes); // New route

// Synchronize models with database
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} else {
    module.exports = app;
}
