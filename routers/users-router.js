import { Router } from "express";
import database from '../database.js';

const router = Router();

const buildReadUsersQuery = (id) => {
    let table = 'teachers';
    let fields = ['TeacherId ','TeacherCode', 'TeacherName','Email'];
    let sql = "";
    if(id){
    sql = `SELECT ${fields} FROM ${table} WHERE TeacherId =:ID`
    }
    else{
        sql = `SELECT ${fields} FROM ${table}`
    }
    return {sql: sql,data:{ID: id}};
}

const getTeachersController = async (req,res)=>{
    const id = req.params.id;
    const {isSucces,result,message:accessorMessage}= await read(id)
    if (!isSucces) return res.status(404).json({message:accessorMessage})

    res.status(200).json(result)
}

const read = async (id)=>{
    try{
        const {sql,data} = buildReadUsersQuery(id);
        const [result] = await database.query(sql,data)
        return (result.length ===0)
        ? {isSucces:false, result:null,message:'Record(s) not found'}
        : {isSucces:true, result:result,message:'Record(s) Succesfully recovered'}
    }
    catch (error){
        return {isSucces:false,result:null,message:`Failed to execute query: ${error.message}`};
    }
}

router.get('/:id',(res,req)=>getTeachersController(res,req));
router.get('/',(res,req)=>getTeachersController(res,req))

export default router;