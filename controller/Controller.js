class Controller {
    constructor(accessor) {
        this.accessor = accessor
    }

    get = async (req, res, variant) => {
        const id = req.params.id;
        const mid = req.params.mid;
        const { isSuccess, result, message: accessorMessage } = await this.accessor.read(id, mid,variant);
        if (!isSuccess) return res.status(400).json({ message: accessorMessage });
        res.status(200).json(result);
    }
    post = async (req, res) => {
        const record = req.body;
        const { isSuccess, result, message: accessorMessage } = await this.accessor.create(record);
        if (!isSuccess) return res.status(404).json({ message: accessorMessage });
        //response to request
        res.status(201).json(result); //id quesry executed successfully we return status 200 and the json encoded array of results
    };
    put = async (req, res) => {
        const id = req.params.id;
        const record = req.body;
        //Access Data
        console.log(JSON.stringify(id));
        console.log(JSON.stringify(record));
        const { isSuccess, result, message: accessorMessage } = await this.accessor.update(record,id);
        if (!isSuccess) return res.status(404).json({ message: accessorMessage });
        //response to request
        res.status(200).json(result); //id quesry executed successfully we return status 200 and the json encoded array of results
    };
    delete = async (req, res) => {
        const id = req.params.id;
        const { isSuccess, result, message: accessorMessage } = await this.accessor.deleteRecords(id);
        if (!isSuccess) return res.status(404).json({ message: accessorMessage });
        //response to request
        res.status(200).json({ message: accessorMessage }); //id quesry executed successfully we return status 200 and the json encoded array of results
    };
}

export default Controller;
