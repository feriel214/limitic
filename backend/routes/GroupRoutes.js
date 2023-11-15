const express = require('express');
const router = express.Router();
const groupController = require('../controllers/GroupController');

// Create a new group
router.post('/create', groupController.createGroup);

// Get all groups
router.get('/getAll', groupController.getAllGroups);

// Get a single group by ID
router.get('/:id', groupController.getGroupById);

// Update a group by ID
router.put('/edit/:id', groupController.editGroup);

// Delete a group by ID
router.delete('/delete/:id', groupController.deleteGroup);

module.exports = router;
