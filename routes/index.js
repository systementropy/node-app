import express from "express";

import {
    insertDetails
}from '../controllers/Details.js';

const router = express.Router();

router.post('/', insertDetails)

export default router;