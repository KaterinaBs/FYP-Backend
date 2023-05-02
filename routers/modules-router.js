import { Router } from "express";
import database from '../database.js';

const router = Router();
//Query Builders
const buildModulesReadQuery = (id, variant) => {
    let sql = '';
    const table = 'Modules INNER JOIN teachersmodules ON teachersmodules.ModuleId = modules.ModuleId';
    const fields = ['TeacherId', 'ModuleName', 'modules.ModuleId','ModuleCode','image'];
    if (variant) {

        sql = `SELECT ${fields} FROM ${table} WHERE teacherId =:ID`;
    }
    else {
        sql = `SELECT ${fields} FROM ${table}`
    }
    return {sql: sql,data: {ID: id}};
}
//Accessors
const read = async (id, variant) => {
    try {
        const { sql, data } = buildModulesReadQuery(id, variant);
        const [result] = await database.query(sql, data);
        return (result.length === 0)
            ? { isSuccess: false, result: null, message: 'No Record(s) Found ' }
            : { isSuccess: true, result: result, message: 'Record(s) succesfully found' };
    }
    catch (error) {
        return { isSuccess: false, result: null, message: `Failed to execute query:${error.message}` };
    }
};
//Controllers
const getModulesController = async (req, res, variant) => {
    const id = req.params.id;//if undefined in the case  of /api/modules endpoint
    const { isSuccess, result, message: accessorMessage } = await read(id, variant);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    res.status(200).json(result);
}
//Endpoints
router.get('/', (req, res) => getModulesController(req, res, null));
router.get('/teachers/:id', (req, res) => getModulesController(req, res, 'teacher'));

export default router;