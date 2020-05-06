const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    const feedback = req.body;
    const queryText = `INSERT INTO "edit_form" ("retailer", "issue_type", "details")
    VALUES ($1, $2, $3)`;
    pool.query(queryText, [feedback.retailer, feedback.issueType, feedback.details])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
})

module.exports = router;