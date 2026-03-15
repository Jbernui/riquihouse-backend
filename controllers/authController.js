const db = require('../config/db');

const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscamos si existe alguien con ese usuario y contraseña
        const [usuarios] = await db.query(
            `SELECT id_usuario, nombre, usuario, rol FROM usuarios WHERE usuario = ? AND password = ?`,
            [usuario, password]
        );

        // Si el arreglo está vacío, es porque escribieron mal algo
        if (usuarios.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        // Si todo está bien, le devolvemos los datos del usuario (pero sin la contraseña por seguridad)
        res.json({
            mensaje: 'Login exitoso',
            usuario: usuarios[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al intentar hacer login' });
    }
};

module.exports = { login };