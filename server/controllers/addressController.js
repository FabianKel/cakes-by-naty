const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');

const addAddress = async (req, res, next) => {
    const { num } = req.params;
    const { user_id, nombre, campo1, campo2, ciudad, departamento, detalles } = req.body;

    try {
        await pool.query(
            `CALL create_and_assign_address($1, $2, $3, $4, $5, $6, $7, $8)`,
            [user_id, nombre, campo1, campo2, ciudad, departamento, detalles, num]
        );
        res.status(201).json({ message: "Dirección agregada exitosamente." });
    } catch (error) {
        next(new ErrorHandler("Error al agregar la dirección", 500, error));
    }
};

const editAddress = async (req, res, next) => {
    const { a_id } = req.params;
    const { nombre, campo1, campo2, ciudad, departamento, detalles } = req.body;

    try {
        await pool.query(
            `CALL edit_dir($1, $2, $3, $4, $5, $6, $7)`,
            [a_id, nombre, campo1, campo2, ciudad, departamento, detalles]
        );
        res.status(200).json({ message: "Dirección editada exitosamente." });
    } catch (error) {
        next(new ErrorHandler("Error al editar la dirección", 500, error));
    }
};

const deleteAddress = async (req, res, next) => {
    const { a_id } = req.params;
    const { user_id } = req.body;

    try {
        await pool.query(
            `CALL delete_dir($1, $2)`,
            [user_id, a_id]
        );
        res.status(200).json({ message: "Dirección eliminada exitosamente." });
    } catch (error) {
        next(new ErrorHandler("Error al eliminar la dirección", 500, error));
    }
};

module.exports = {
    addAddress,
    editAddress,
    deleteAddress
};
