var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController')
/* GET home page. */
router.get('/',overviewController.GetOverview);



module.exports = router;
