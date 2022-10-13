const router = require('express').Router();
const { createTask, getTasks, putTasks, deleteTasks } = require('../controllers/task.controllers');

const validarJWT = require('../middlewares/validar-jwt');

// Crear nueva tarea
router.post('/task', [
    validarJWT,
], createTask);


router.get('/task', [
    validarJWT
], getTasks);

router.put('/task/:id', [
    validarJWT
], putTasks)

router.delete('/task/:id', [
    validarJWT
], deleteTasks)

module.exports = router;