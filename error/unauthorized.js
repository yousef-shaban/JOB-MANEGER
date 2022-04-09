import CustomError from "./customError.js";
class unauthorized extends CustomError
{
	constructor(message)
	{
		super(message)
		this.StatusCode = 401;
	}
}

export default unauthorized;
