const express = require("express");
const router = express.Router();

const searchViews = require("../controllers/search");

// GET - Main page
router.get("/", searchViews.getMainPage);

// POST - Query to the BM25 model
router.post("/query/send/bm25", searchViews.getBM25Results);

// POST - Query to the VSM model
router.post("/query/send/vsm", searchViews.getVSMResults);

// POST - Query to the BM25 with relevance feedback
router.post("/query/send/bm25/feedback", searchViews.relevanceFeedbackBM25);

// POST - Query to the VSM with relevance feedback
router.post("/query/send/vsm/feedback", searchViews.relevanceFeedbackVSM);

module.exports = router;
