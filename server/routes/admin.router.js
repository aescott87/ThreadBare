const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmin } = require('../modules/admin-authentication-middleware');

router.get('/', rejectNonAdmin, (req, res) => {

}

router.put('/', rejectNonAdmin, (req, res) => {

}

router.delete('/', rejectNonAdmin, (req, res) => {

}