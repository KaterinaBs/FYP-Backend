class Accessor {
    constructor(model, database) {
        this.model = model;
        this.database = database;
    }
    //Methods
    read = async (id,mid,variant) => {
        try {
            const { sql, data } = this.model.buildReadQuery(id, mid,variant);
            const [result] = await this.database.query(sql, data);
            return (result.length === 0)

                ? { isSuccess: false, result: null, message: 'No Record(s) Found ' }
                : { isSuccess: true, result: result, message: 'Record(s) succesfully found' };
        }
        catch (error) {
            return { isSuccess: false, result: null, message: `Failed to execute query:${error.message}` }
        }
    };
    create = async (record) => {
        try {
            const { sql, data } = this.model.buildCreateQuery(record);
            const status = await this.database.query(sql, data);

            const { isSuccess, result, message } = await this.read(status[0].insertId, null);
            return isSuccess

                ? { isSuccess: true, result: result, message: 'Record(s) successfully recovered' }
                : { isSuccess: false, result: null, message: `Failed to recover inserted record: ${message}` };
        }
        catch (error) {
            return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` }
        }
    };
    update = async (record, id) => {
        try {
            const { sql, data } = this.model.buildUpdateQuery(record, id);
            const status = await this.database.query(sql, data);
            console.log(sql);
            if (status[0].affectedRows === 0)
                return { isSuccess: false, result: null, message: 'Failed to update record:no rows were affected' };
            const { isSuccess, result, message } = await this.read(id, null);
            return isSuccess
                ? { isSuccess: true, result: result, message: 'Record(s) successfully recovered' }
                : { isSuccess: false, result: null, message: `Failed to recover updated record: ${message}` };
        }
        catch (error) {
            return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` }
        }
    };
    deleteRecords = async (id) => {
        try {
            const { sql, data } = this.model.buildDeleteQuery(id);
            const status = await this.database.query(sql, data);
            return status[0].affectedRows === 0
                ? { isSuccess: false, result: null, message: `Failed to delete record: ${id}` }
                : { isSuccess: true, result: null, message: 'Record successfully deleted' };
        }
        catch (error) {
            return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` }
        }
    };
}
export default Accessor;