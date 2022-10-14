const Tasks = require('../models/Tasks');
ctrlTask = {};


ctrlTask.createTask = async (req, res) => {
    const { title, description } = req.body;

    const task = new Tasks({
        title,
        description,
        userId: req.user._id
    });


    try {
        const newTask = await task.save();

        return res.json({
            msg: 'Tarea creada correctamente',
            newTask
        })
    } catch (error) {
        return res.status(500).json({
            msg:'Error al crear la tarea'
        })
    }
}

ctrlTask.getTasks = async (req, res) => {
    const tasks = await Tasks.find({$and: [{userId: req.user._id}, {isActive: true}]})
    .populate('userId', ['username','email'])
    return res.json(tasks);
}

ctrlTask.putTasks = async (req, res) => {
    try {
        const idTask = req.params.id;
        const userID=req.user._id
        const Task = await Tasks.findById(idTask);

        const userIdString = userID.toString();
        const tareaIdString = Task.userId.toString();

        if (!(userIdString === tareaIdString)) {
            return res.status(400).json({
                message: 'No tienes permiso para actualizar esta tarea tarea'
            })
        }
        
        const { title, description, ...otroDatos } = req.body;

        if (!idTask || !description || !title) {
            return res.status(400).json({
                msg: 'No viene id en la petición',
            });
        };

        const tareaActualizada = await Tasks.findByIdAndUpdate(idUser, { title, description })

        return res.json({
            msg: 'Tarea actualizada correctamente',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: 'Error al actualizar la tarea'
        })
    }
};

ctrlTask.deleteTasks = async (req, res) => {
    try {
        const idTask = req.params.id;
        const userID=req.user._id
        const Task = await Tasks.findOne({$and:[{_id:idTask},{isActive:true}]})

        const userIDString = userID.toString() 
        const tareaIDString = Task.userId.toString()

        if(!(userIDString === tareaIDString)) {
            return res.status(401).json({
                msg: 'Usuario sin permisos para eliminar la tarea'
            })
        }
        await Tasks.findByIdAndUpdate(idTask, { isActive: false })
        return res.json('Tarea eliminada correctamente');
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            msg: 'Error al eliminar la tarea'
        });
    }
};


module.exports = ctrlTask;