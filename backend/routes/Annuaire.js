const express = require('express');
const router = express.Router();
const {addAnnuaire,allAnnuaires, singleAnnuaire, editAnnuaire, deleteAnnuaire } = require('../controllers/Annuaire');
 

// Annuaire routes
router.post('/addAnnuaire', addAnnuaire);
// /api/allannuaires
router.get('/getall', allAnnuaires);

// /api/annuaire/id
router.get('/:id', singleAnnuaire);

// /api/annuaire/edit/id
router.put('/edit/:id', editAnnuaire);

// /api/admin/annuaire/delete/id
router.delete('/delete/:id', deleteAnnuaire);

module.exports = router;


