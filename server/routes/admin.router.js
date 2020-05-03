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

router.put('/', (req, res) => {
    const retailer = req.body;
    console.log('retailer is', retailer);
    const queryText = `SELECT "id" FROM "retailer" WHERE "name" = $1`;
    pool.query(queryText, [retailer.name])
        .then((result) => {
            console.log('results are', result.rows);
            
            for (row of result.rows) {
                const deleteRetailerSizeQuery = `DELETE FROM "retailer_size" WHERE "retailer_id" = $1`;
                const deleteRetailerQuery = `DELETE FROM "retailer" WHERE "id" = $1`;
                pool.query(deleteRetailerSizeQuery, [row.id])
                pool.query(deleteRetailerQuery, [row.id])
            }
            const selectSizeIds = [];
            if (retailer.sizes.includes('Plus Sizes (12-32)')) {
                selectSizeIds.push(1);
            }
            if (retailer.sizes.includes('Petite Sizes (00-0)')) {
                selectSizeIds.push(2);
            }
            if (retailer.sizes.includes('X-Short Inseam (28" or less)')) {
                selectSizeIds.push(3);
            }
            if (retailer.sizes.includes('Short Inseam (28"-30")')) {
                selectSizeIds.push(4);
            }
            if (retailer.sizes.includes('Long Inseam (34"-36")')) {
                selectSizeIds.push(5);
            }
            if (retailer.sizes.includes('X-Long Inseam (36" or more)')) {
                selectSizeIds.push(6);
            }
            const availability = []
            if (retailer.available.includes('In Store')) {
                availability.push('In Store')
            }
            if (retailer.available.includes('Online')) {
                availability.push('Online')
            }
            for (available of availability) {
                pool.query(`INSERT INTO "retailer" ("name", "website", "available") VALUES ($1, $2, $3) RETURNING "id"`, [retailer.name, retailer.website, available])
                    .then((insertResult) => {
                        retailerId = insertResult.rows[0].id;
                        for (sizeId of selectSizeIds) {
                            pool.query(`INSERT INTO "retailer_size" ("retailer_id", "size_id") VALUES ($1, $2)`, [retailerId, sizeId])
                        }
                    })
            }
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        });
});


module.exports = router;