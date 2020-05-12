const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-authentication-middleware');

//POST edit request from user
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('feedback is', req.body);
    const feedback = req.body;
    const queryText = `INSERT INTO "edit_form" ("retailer", "issue_type", "details")
    VALUES ($1, $2, $3)`;
    pool.query(queryText, [feedback.retailer, feedback.issueType, feedback.details])
        .then((result) => {
            console.log('POST successful!');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in POST request', error);
            res.sendStatus(500);
        });
})

//GET all edit requests to the Admin
router.get('/', rejectNonAdmin, (req, res) => {
    console.log('in GET feedback');
    const queryText = `SELECT * FROM "edit_form"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error with GET feedback request', error);
            res.sendStatus(500);
        });
})

//DELETE allows Admin to delete any resolved edit requests
router.delete('/:id', rejectNonAdmin, (req, res) => {
    const id = req.params.id;
    console.log('feedback id is ', id);
    const queryText = `DELETE FROM "edit_form" WHERE "id" = $1`;
    pool.query(queryText, [id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Cannot complete DELETE feedback request', error);
            res.sendStatus(500);
        })
})

module.exports = router;