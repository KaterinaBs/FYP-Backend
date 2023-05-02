const model = {};

model.table = 'announcements';
model.mutableFields = ['AnnouncementsId', 'AnnouncementsTitle', 'AnnouncementsDetails', 'TeacherId'];
model.idField = 'AnnouncementsId';

model.buildReadQuery = (id, mid, variant) => {
    let sql = ""
    switch (variant) {
        case 'moduleAnnouncement':
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE TeacherId = :ID AND ModuleId =:MID`
            break;
        case 'announcement':
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE TeacherId =:ID`
            break;
        default:
            sql = `SELECT ${model.mutableFields} FROM ${model.table} WHERE AnnouncementsId=:ID`
    }
    return { sql: sql, data: { ID: id, MID: mid } }
}
export default model;