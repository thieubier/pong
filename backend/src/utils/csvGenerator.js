// backend/src/utils/csvGenerator.js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.generateCSV = (data, path) => {
    const csvWriter = createCsvWriter({
        path: path,
        header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
    });

    return csvWriter.writeRecords(data);
};
