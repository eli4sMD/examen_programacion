const esAdmin = (req, res, next) => {
    if(req.user.role !== 'admin_user'){
        return res.status(401).json({
            msg:'No autorizado - No eres administrador'
        })

    }

    next();
}


module.exports = esAdmin;