import Jwt from "jsonwebtoken";
import {unauthorized} from "../error/main.js";
import {} from "dotenv/config"

const AuthMiddleware = (req, res, next) => {
	try {
		// console.log(req.headers);
		const Auth = req.headers.authorization
		if (!Auth || !Auth.startsWith("Bearer ")) {
			throw new unauthorized("No Token Valide");
		}

		const token = Auth.split(" ")[1];
		const decoded = Jwt.verify(token, process.env.JWT_SECRET);

		const { UserName, UserId } = decoded;
		req.user = { UserName, UserId };
		
		next();

	} catch (error) {
		
        next(error);
	}
};

export default AuthMiddleware;
