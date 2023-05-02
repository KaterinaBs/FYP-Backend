const model={};

model.table = 'assignments';
model.mutableFields = ['AssignmentId','AssignmentTitle', 'Details','Deadline', 'TeacherId', 'ModuleId'];
model.idField = 'AssignmentId';

model.buildReadQuery = (id,mid,variant) => {
    let sql = "";
    switch(variant){
        case 'modulesAssignments':
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE TeacherId =:ID AND ModuleId = :MID`
            break; 
        case 'assignment':
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE TeacherId =:ID` 
            break;
        default:
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE AssignmentId =:ID`
    }
    return {sql: sql, data:{ID: id, MID:mid}}
}
export default model;