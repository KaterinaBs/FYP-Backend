const model={};
model.table = 'homework' 
model.mutableFields = ['HomeworkId','Details', 'DueDay', 'TeacherId','ModuleId']
model.idField = 'HomeworkId'
model.buildReadQuery = (id,mid, variant) => {
    let sql = "";
    switch(variant){
        case 'moduleHomework':
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE TeacherId =:ID AND ModuleId = :MID`
            break; 
        case 'homework':
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE TeacherId =:ID`
            break;
        default:
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE HomeworkId =:ID`
    }
    return {sql: sql, data:{ID: id, MID:mid}}
}
export default model;