const express = require('express');
const router = express.Router();
const {
  addPublication,
  allPublications,
  singlePublication,
  editPublication,
  deletePublication
} = require('../controllers/Publication');

// Publication routes
router.post('/addPublication', addPublication);
router.get('/getAll', allPublications);
router.get('/:id', singlePublication);
router.put('/edit/:id', editPublication);
router.delete('/delete/:id', deletePublication);

module.exports = router;
