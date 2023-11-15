const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//user routes

// /api/allusers
//router.get('/allusers', isAuthenticated, isAdmin, allUsers);
router.get('/allusers', allUsers);
// /api/user/id
router.get('/user/:id', singleUser);
//router.get('/user/:id', isAuthenticated, singleUser);
// /api/user/edit/id
//router.put('/user/edit/:id', isAuthenticated, editUser);
router.put('/user/edit/:id' , editUser);
// /api/admin/user/delete/id
//router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
router.delete('/admin/user/delete/:id', deleteUser);




module.exports = router;