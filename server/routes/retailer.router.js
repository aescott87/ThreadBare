const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const sizeIds = [];

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
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
        if(req.body.sizes.plus_size) {
            selectSizeIds.push(1);
        }
        if(req.body.sizes.petite_size) {
            selectSizeIds.push(2);
        }
        if(req.body.sizes.xshort) {
            selectSizeIds.push(3);
        }
        if(req.body.sizes.short) {
            selectSizeIds.push(4);
        }
        if(req.body.sizes.long) {
            selectSizeIds.push(5);
        }
        if(req.body.sizes.xlong) {
            selectSizeIds.push(6);
        }
        const availability = []
        if(req.body.available.inStore) {
            availability.push('In Store')
        }
        if(req.body.available.online) {
            availability.push('Online')
        }
        pool.query(`SELECT "id" FROM "retailer" WHERE "name" = $1`, 
        [req.body.name])
            .then((result) => {
                console.log('result is', result.rows);
                if(result.rows.length === 0) {
                    pool.query(`INSERT INTO "retailer" ("name", "website") VALUES ($1, $2) RETURNING "id"`, [req.body.name, req.body.website])
                    .then((insertResult) => {
                        retailerId = insertResult.rows[0].id;
                        for(sizeId of selectSizeIds) {
                            for(available of availability) {
                                pool.query(`INSERT INTO "retailer_size" ("retailer_id", "size_id", "available") VALUES ($1, $2, $3)`, [retailerId, sizeId, available])
                            }
                        }
                    })
                } else {
                    retailerId = result.rows[0].id;
                    console.log('the retailer id is', retailerId);
                    for(sizeId of selectSizeIds) {
                        for(available of availability) {
                            console.log('Values added are', retailerId, sizeId, available);
                            
                            pool.query(`INSERT INTO "retailer_size" ("retailer_id", "size_id", "available") VALUES ($1, $2, $3)`, [retailerId, sizeId, available])
                        }
                    }
                }
                res.sendStatus(200);
            }).catch((error) => {
                res.sendStatus(500);
            });
    }
});

module.exports = router;