import CustomError from "../error/customError.js";

const mainErrorHandling = (err, req, res, next) => {

	if (err instanceof CustomError)
	{
		return res.status(err.StatusCode).json({ err: err.message });
	}
	else
	{
		return res.status(500).json({err});
	}

};

export default mainErrorHandling