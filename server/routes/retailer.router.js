const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('search request', req.query.retailerName);
    const queryText = `SELECT "name", "website", "available", "type" FROM "retailer"
    JOIN "retailer_size" ON "retailer"."id" = "retailer_size"."retailer_id"
    JOIN "size" ON "retailer_size"."size_id" = "size"."id"
    WHERE "name" LIKE ($1);`;
    pool.query(queryText, [req.query.retailerName])
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing GET retailer query', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    let retailerId;
    console.log('Adding new retailer!', req.body);
    if (req.isAuthenticated()) {
        console.log('sizes are', req.body.sizes);
        const selectSizeIds = [];
        if (req.body.sizes.plus_size) {
            selectSizeIds.push(1);
        }
        if (req.body.sizes.petite_size) {
            selectSizeIds.push(2);
        }
        if (req.body.sizes.xshort) {
            selectSizeIds.push(3);
        }
        if (req.body.sizes.short) {
            selectSizeIds.push(4);
        }
        if (req.body.sizes.long) {
            selectSizeIds.push(5);
        }
        if (req.body.sizes.xlong) {
            selectSizeIds.push(6);
        }
        const availability = []
        if (req.body.available.inStore) {
            availability.push('In Store')
        }
        if (req.body.available.online) {
            availability.push('Online')
        }
        pool.query(`SELECT "id" FROM "retailer" WHERE "name" = $1`,
            [req.body.name])
            .then((result) => {
                console.log('result is', result.rows);
                if (result.rows.length === 0) {
                    for (available of availability) {
                        pool.query(`INSERT INTO "retailer" ("name", "website", "available") VALUES ($1, $2, $3) RETURNING "id"`, [req.body.name, req.body.website, available])
                            .then((insertResult) => {
                                retailerId = insertResult.rows[0].id;
                                for (sizeId of selectSizeIds) {
                                    pool.query(`INSERT INTO "retailer_size" ("retailer_id", "size_id") VALUES ($1, $2)`, [retailerId, sizeId])
                                }
                            })
                    }
                } else {
                    retailerId = result.rows[0].id;
                    console.log('the retailer id is', retailerId);
                    for (sizeId of selectSizeIds) {
                        console.log('Values added are', retailerId, sizeId, available);
                        pool.query(`INSERT INTO "retailer_size" ("retailer_id", "size_id", "available") VALUES ($1, $2, $3)`, [retailerId, sizeId, available])
                    }
                }
                res.sendStatus(200);
            }).catch((error) => {
                res.sendStatus(500);
            });
    }
});

module.exports = router;