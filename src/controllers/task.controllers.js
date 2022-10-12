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
    const tasks = await Tasks.find({ userId: req.user._id })
    .populate('userId', ['username','email'])
    return res.json(tasks);
}

ctrlTask.putTasks = async (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, ...otroDatos } = req.body;

    if (!id || !descripcion || !titulo) {
        return res.status(400).json({
            msg: 'No viene id en la petición',
        });
    };

    try {
        const tareaActualizada = await Tasks.findByIdAndUpdate(id, { titulo, descripcion })

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
    const id = req.params.id;

    try {
        await Tasks.findByIdAndUpdate(id, { isActive: false })
        return res.json('Tarea eliminada correctamente');
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            msg: 'Error al eliminar la tarea'
        });
    }
};


module.exports = ctrlTask;