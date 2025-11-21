const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/recordsController');

router.get('/records', ctrl.index);
router.get('/records/new', ctrl.newForm);
router.post('/records', ctrl.create);
router.get('/records/:id', ctrl.show);
router.get('/records/:id/edit', ctrl.editForm);
router.put('/records/:id', ctrl.update);
router.delete('/records/:id', ctrl.delete);

module.exports = router;
