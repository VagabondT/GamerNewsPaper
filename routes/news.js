var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController')
/* GET home page. */
router.get('/',overviewController.GetNewsOverview);
router.get('/:id',overviewController.RenderNewsview);


module.exports = router;
