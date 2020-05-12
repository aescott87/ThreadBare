const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET search results based on query
router.get('/', rejectUnauthenticated, (req, res) => {
    //Conditional based on if the search type was by retailer name
    if (req.query.retailerName) {
        console.log('search query is', req.query.retailerName);
        const queryText = `SELECT "name", "website", "available", "type" FROM "retailer"
    JOIN "retailer_size" ON "retailer"."id" = "retailer_size"."retailer_id"
    JOIN "size" ON "retailer_size"."size_id" = "size"."id"
    WHERE "name" LIKE ($1);`;
        pool.query(queryText, [req.query.retailerName])
            .then((result) => {
                //This array is where we will store our search results.
                const combinedRetailers = [];
                for(row of result.rows) {
                    const retailer = {
                        name: row.name,
                        website: row.website,
                        sizes: [row.type],
                        available: [row.available]
                    }
                    //Based on the structure of the DB, a retailer can appear in multiple result rows
                    //Since we don't want a retailer to appear multiple times in a search result for a user, we will loop through our results and refine
                    //Loops through each result row to determine if the retailer name is already in the combinedRetailers array 
                    let foundRetailer = combinedRetailers.find(function(retailer) {
                        return retailer.name === row.name;
                    })
                    //If the retailer name is not found, we can add it to the combinedRetailers array along with the other data in that result row
                    if(foundRetailer === undefined) {
                        combinedRetailers.push(retailer)
                    } else {
                        //Now we will check to see if there are any other rows with the same retailer name but a different size type
                        let foundSize = foundRetailer.sizes.find(function(size) {
                            return size === row.type;
                        })
                        //If not found, we will add that size to the retailer object in the array
                        if(foundSize === undefined) {
                            foundRetailer.sizes.push(row.type);
                        }
                        //Now we will check to see if there are any other rows with the same retailer name but a different availability type
                        let foundAvailable = foundRetailer.available.find(function(available) {
                            return available === row.available;
                        })
                        //If not found, we will add that availability type to the retailer object in the array
                        if(foundAvailable === undefined) {
                            foundRetailer.available.push(row.available);
                        }
                    }
                }
                console.log('new data is', combinedRetailers); 
                res.send(combinedRetailers); 
            })
            .catch((error) => {
                console.log('Error completing GET retailer query', error);
                res.sendStatus(500);
            });
    //This will run if the search query type was based on size
    } else if (req.query) {
        console.log('search query is', req.query);
        const selectSizeIds = [];
        //Each size has it's own size ID in the DB
        //Using conditionals, we are checking that each size ID in our search query is added to the array to check in the DB
        if (req.query.plus_size === 'true') {
            selectSizeIds.push(1);
        }
        if (req.query.petite_size === 'true') {
            selectSizeIds.push(2);
        }
        if (req.query.xshort === 'true') {
            selectSizeIds.push(3);
        }
        if (req.query.short === 'true') {
            selectSizeIds.push(4);
        }
        if (req.query.long === 'true') {
            selectSizeIds.push(5);
        }
        if (req.query.xlong === 'true') {
            selectSizeIds.push(6);
        }
        let sizeParams = [];
        //This is for a scenario in which a user has searched multiple sizes
        //This will add a join to our query text that will account for any number of size IDs being searched
        for(let i = 0; i < selectSizeIds.length; i++) {
            sizeParams.push('$' + (i + 1))
        }
        console.log('the size ids are', selectSizeIds);
        const queryText = `SELECT "name", "website", "available", "type" FROM "retailer"
        JOIN "retailer_size" ON "retailer"."id" = "retailer_size"."retailer_id"
        JOIN "size" ON "retailer_size"."size_id" = "size"."id"
        WHERE "size"."id" IN (${sizeParams.join(', ')})`;
        pool.query(queryText, selectSizeIds)
            .then((result) => {
                const combinedRetailers = [];
                for(row of result.rows) {
                    const retailer = {
                        name: row.name,
                        website: row.website,
                        sizes: [row.type],
                        available: [row.available]
                    }
                    //Based on the structure of the DB, a retailer can appear in multiple result rows
                    //Since we don't want a retailer to appear multiple times in a search result for a user, we will loop through our results and refine
                    //Loops through each result row to determine if the retailer name is already in the combinedRetailers array
                    let foundRetailer = combinedRetailers.find(function(retailer) {
                        return retailer.name === row.name;
                    })
                    //If the retailer name is not found, we can add it to the combinedRetailers array along with the other data in that result row
                    if(foundRetailer === undefined) {
                        combinedRetailers.push(retailer)
                    } else {
                        //Now we will check to see if there are any other rows with the same retailer name but a different size type
                        let foundSize = foundRetailer.sizes.find(function(size) {
                            return size === row.type;
                        })
                        //If not found, we will add that size to the retailer object in the array
                        if(foundSize === undefined) {
                            foundRetailer.sizes.push(row.type);
                        }
                        //Now we will check to see if there are any other rows with the same retailer name but a different availability type
                        let foundAvailable = foundRetailer.available.find(function(available) {
                            return available === row.available;
                        })
                        if(foundAvailable === undefined) {
                            foundRetailer.available.push(row.available);
                        }
                    }
                }
                console.log('new data is', combinedRetailers);
                res.send(combinedRetailers); })
            .catch((error) => {
                console.log('Error completing GET size query', error);
                res.sendStatus(500);
            });
    }
});

//POST new data from user
router.post('/', rejectUnauthenticated, (req, res) => {
    let retailerId;
    console.log('Adding new retailer!', req.body);
    if (req.isAuthenticated()) {
        console.log('sizes are', req.body.sizes);
        const selectSizeIds = [];
        //Each size has it's own size ID in the DB
        //Using conditionals, we are checking that each size in our new entry is added to the array to be added to the DB
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
        //The same is done for availability
        if (req.body.available.inStore) {
            availability.push('In Store')
        }
        if (req.body.available.online) {
            availability.push('Online')
        }
        //Check to see if the retailer is already listed in the DB
        pool.query(`SELECT "id" FROM "retailer" WHERE "name" = $1`,
            [req.body.name])
            .then((result) => {
                console.log('result is', result.rows);
                //Conditional based on if the retailer is not already in the DB
                if (result.rows.length === 0) {
                    //Now we will loop through the array and add each piece of availability data to the DB
                    for (available of availability) {
                        pool.query(`INSERT INTO "retailer" ("name", "website", "available") VALUES ($1, $2, $3) RETURNING "id"`, [req.body.name, req.body.website, available])
                            .then((insertResult) => {
                                retailerId = insertResult.rows[0].id;
                                //Now we will do the same for sizes
                                for (sizeId of selectSizeIds) {
                                    pool.query(`INSERT INTO "retailer_size" ("retailer_id", "size_id") VALUES ($1, $2)`, [retailerId, sizeId])
                                }
                            })
                    }
                } else {
                    //If the retailer is already listed in the DB, we will add any sizes that are not already present
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