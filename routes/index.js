var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController')
/* GET home page. */
router.get('/',overviewController.GetOverview);
router.get('/news',overviewController.GetNewsOverview);


module.exports = router;
