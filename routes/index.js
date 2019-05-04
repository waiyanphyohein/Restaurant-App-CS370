var express = require('express');
var router = express.Router();

let landing = require("../controllers/landing");
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/',landing.submit_lead);

// SHOWING LEAD
router.get('/leads',landing.show_leads);
router.get('/lead/:lead_id',landing.show_lead);

// EDITING LEAD
router.get('/lead/:lead_id/edit',landing.show_edit_lead);
router.post('/lead/:lead_id/edit',landing.edit_lead);

// DELETING LEAD
router.post('/lead/:lead_id/delete',landing.delete_lead);

router.post('/lead/:lead_id/delete-json',landing.delete_lead_json);

module.exports = router;