const express = require('express');
const router = express.Router();

const { 
  createEmployee, 
  getEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee,
  login,
  logout,
  debugEmployees,
  whoAmI
} = require('../controllers/employeeController');

const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/auth');
const { createEmployeeSchema, updateEmployeeSchema, loginSchema } = require('../validations/employeeValidation');

// Employee Authentication Routes (No authentication required)
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

// Employee Management Routes (Admin or SuperAdmin only) - TEMPORARILY REMOVED AUTH FOR TESTING
router.post('/employees', validate(createEmployeeSchema), createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/update-employee/:id', verifyAdmin, validate(updateEmployeeSchema), updateEmployee);
router.post('/delete-employee/:id', verifyAdmin, deleteEmployee);

// Debug route (for debugging only - REMOVE IN PRODUCTION)
router.get('/debug-employees', debugEmployees);

// Who Am I Route (requires authentication)
router.get('/whoami', auth, whoAmI);

module.exports = router;
