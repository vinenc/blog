const express = require("express");
const router = express.Router();

const paper = require("../util/paper");
const user = require("../util/user");
const chart = require("../util/dataChat");

router.get("/getCount", paper.getCount);
router.get("/getPaper", paper.getPaper);
router.get("/getPaperList", paper.getPaperList);
router.get("/getPaperTop", paper.getPaperTop);
router.post("/searchPaper", paper.searchPaper);
router.get("/searchPaperList", paper.searchPaperList);
router.get("/typePaperList", paper.typePaperList);
router.post("/addPaper", paper.addPaper);
router.post("/delPaper", paper.delPaper);
router.post("/addWatcher", paper.addWatcher);

router.post("/login", user.login);
router.post("/verify", user.verify);

router.post("/getDataChart", chart.getDataChart);

module.exports = router;
