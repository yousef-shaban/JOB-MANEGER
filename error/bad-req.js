import CustomError from "./customError.js"
class badreq extends CustomError
{
    constructor(message)
    {
        super(message)
        this.StatusCode = 400
    }

}

export default badreq;