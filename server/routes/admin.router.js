const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//Ensures only admins can complete
const { rejectNonAdmin } = require('../modules/admin-authentication-middleware');

//GET all retailers from the DB
router.get('/', rejectNonAdmin, (req, res) => {
    console.log('in admin GET');
    const queryText = `SELECT "retailer"."id", "name", "website", "available", "type" FROM "retailer"
    JOIN "retailer_size" ON "retailer"."id" = "retailer_size"."retailer_id"
    JOIN "size" ON "retailer_size"."size_id" = "size"."id"
    ORDER BY "name" ASC`;
    pool.query(queryText)
        .then((result) => {
            //This array is where we will store our retailers.
            const combinedRetailers = [];
            for (row of result.rows) {
                const retailer = {
                    name: row.name,
                    website: row.website,
                    sizes: [row.type],
                    available: [row.available]
                }
                //Based on the structure of the DB, a retailer can appear in multiple result rows
                //Since we don't want a retailer to appear multiple times in the full retailers list, we will loop through our results and refine
                //Loops through each result row to determine if the retailer name is already in the combinedRetailers array 
                let foundRetailer = combinedRetailers.find(function (retailer) {
                    return retailer.name === row.name;
                })
                //If the retailer name is not found, we can add it to the combinedRetailers array along with the other data in that result row
                if (foundRetailer === undefined) {
                    combinedRetailers.push(retailer)
                } else {
                    //Now we will check to see if there are any other rows with the same retailer name but a different size type
                    let foundSize = foundRetailer.sizes.find(function (size) {
                        return size === row.type;
                    })
                    //If not found, we will add that size to the retailer object in the array
                    if (foundSize === undefined) {
                        foundRetailer.sizes.push(row.type);
                    }
                    //Now we will check to see if there are any other rows with the same retailer name but a different availability type
                    let foundAvailable = foundRetailer.available.find(function (available) {
                        return available === row.available;
                    })
                    if (foundAvailable === undefined) {
                        foundRetailer.available.push(row.available);
                    }
                }
            }
            console.log('new data is', combinedRetailers);
            //Send the combinedRetailers array of our pared down results
            res.send(combinedRetailers);
        })
        .catch((err) => {
            console.log('Error completing SELECT retailers query', err);
            res.sendStatus(500);
        });
});

//Edit a particular retailer
router.put('/', rejectNonAdmin, (req, res) => {
    const retailer = req.body;
    console.log('retailer is', retailer);
    //Find the retailer by ID
    const queryText = `SELECT "id" FROM "retailer" WHERE "name" = $1`;
    pool.query(queryText, [retailer.name])
        .then((result) => {
            console.log('results are', result.rows);
            //Now that we have the retailer ID, we can delete any entries of this retailer and enter new, correct data
            for (row of result.rows) {
                const deleteRetailerSizeQuery = `DELETE FROM "retailer_size" WHERE "retailer_id" = $1`;
                const deleteRetailerQuery = `DELETE FROM "retailer" WHERE "id" = $1`;
                pool.query(deleteRetailerSizeQuery, [row.id])
                pool.query(deleteRetailerQuery, [row.id])
            }
            //Each size has it's own size ID in the DB
            //Using conditionals, we are checking that each size in our new, updated entry is added to the array to be added to the DB
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
            //The same is done for availability
            const availability = []
            if (retailer.available.includes('In Store')) {
                availability.push('In Store')
            }
            if (retailer.available.includes('Online')) {
                availability.push('Online')
            }
            //Now we will loop through the array and add each piece of availability data to the DB
            for (available of availability) {
                pool.query(`INSERT INTO "retailer" ("name", "website", "available") VALUES ($1, $2, $3) RETURNING "id"`, [retailer.name, retailer.website, available])
                    .then((insertResult) => {
                        retailerId = insertResult.rows[0].id;
                        //Now we will do the same for sizes
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
//DELETE a row of data from the DB
router.delete('/:name', rejectNonAdmin, (req, res) => {
    const retailerName = req.params.name;
    console.log('retailer is', retailerName);
    const queryText = `SELECT "id" FROM "retailer" WHERE "name" = $1`;
    //Now that we have the retailer ID, we can delete retailer data from all applicable tables in the DB
    pool.query(queryText, [retailerName])
        .then((result) => {
            console.log('results are', result.rows);
            for (row of result.rows) {
                const deleteRetailerSizeQuery = `DELETE FROM "retailer_size" WHERE "retailer_id" = $1`;
                const deleteRetailerQuery = `DELETE FROM "retailer" WHERE "id" = $1`;
                pool.query(deleteRetailerSizeQuery, [row.id])
                pool.query(deleteRetailerQuery, [row.id])
            }
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error deleting retailer', error);
            res.sendStatus(500);
        });
});


module.exports = router;