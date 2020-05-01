const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmin } = require('../modules/admin-authentication-middleware');

router.get('/', (req, res) => {
    console.log('in admin GET');
    const queryText = `SELECT "retailer"."id", "name", "website", "available", "type" FROM "retailer"
    JOIN "retailer_size" ON "retailer"."id" = "retailer_size"."retailer_id"
    JOIN "size" ON "retailer_size"."size_id" = "size"."id"
    ORDER BY "name" ASC`;
    pool.query(queryText)
        .then((result) => {
            const combinedRetailers = [];
            for (row of result.rows) {
                const retailer = {
                    name: row.name,
                    website: row.website,
                    sizes: [row.type],
                    available: [row.available]
                }
                let foundRetailer = combinedRetailers.find(function (retailer) {
                    return retailer.name === row.name;
                })
                if (foundRetailer === undefined) {
                    combinedRetailers.push(retailer)
                } else {
                    let foundSize = foundRetailer.sizes.find(function (size) {
                        return size === row.type;
                    })
                    if (foundSize === undefined) {
                        foundRetailer.sizes.push(row.type);
                    }
                    let foundAvailable = foundRetailer.available.find(function (available) {
                        return available === row.available;
                    })
                    if (foundAvailable === undefined) {
                        foundRetailer.available.push(row.available);
                    }
                }
            }
            console.log('new data is', combinedRetailers);
            res.send(combinedRetailers);
        })
        .catch((err) => {
            console.log('Error completing SELECT retailers query', err);
            res.sendStatus(500);
        });
});


module.exports = router;