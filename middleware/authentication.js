import Jwt from "jsonwebtoken";
import {unauthorized} from "../error/main.js";
import bodyParser from "body-parser";
import {} from "dotenv/config"
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const AuthMiddleware = (req, res, next) => {
	try {

		const token = req.cookies.token
		if (!token) {
			res.status(301).redirect("/login")
		}

		const decoded = Jwt.verify(token, process.env.JWT_SECRET);
		const { UserName, UserId } = decoded;
		req.user = { UserName, UserId };
		next();

	} catch (error) {
		
		next(error)
	}
};

export default AuthMiddleware;
