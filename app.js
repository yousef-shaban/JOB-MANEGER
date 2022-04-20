import express from "express";
import errorHandlerMiddleware from "./middleware/error-handling.js";
import notFound from "./middleware/not-found.js";
import connectDB from "./db/db.js";
import AuthRouter from "./router/auth_router.js"
import JobsRouter from "./router/router_jobs.js"
import AuthMiddleware from "./middleware/authentication.js"
import {} from "dotenv/config"
import helmet from "helmet";
import cors from "cors"
import xss from "xss"
import bodyParser from "body-parser"
import swagger from "swagger-ui-express"
import yaml from "yamljs"
import path from "path"
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const swaggerDoc = yaml.load("./swagger.yaml")
import rateLimit from "ratelimiter"

const PORT = process.env.PORT || 3000;
const app = express();
// 
// middleware


// app.use(
// 	helmet({
// 		contentSecurityPolicy: false,
// 	}),
// );
app.use(express.json());
app.use(cors())

// server css as static
app.use(express.static("./view"));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(express.static("./view"));

app.use(cookieParser())

app.get("/", AuthMiddleware, (req, res) => {

	res.sendFile(__dirname + "/view/dashboard.html");
});
app.get("/login", (req, res)=>
{
	res.sendFile(__dirname + "/view/login.html");
})

app.get("/register", (req, res) => {
	res.sendFile(__dirname + "/view/register.html");
});
app.get("/logout", (req, res) => {
	res.clearCookie("token")
	res.redirect("/")
});

// app.get("/dashboard", AuthMiddleware, (req, res, next) => {
// 	res.sendFile(__dirname + "/view/dashboard.html");
// });




app.use("/api-doc", swagger.serve, swagger.setup(swaggerDoc))


// router
app.use("/api/v1/jobs", AuthMiddleware, JobsRouter);
app.use("/api/v1/auth", AuthRouter);

// error handling middleware
app.use(errorHandlerMiddleware);

// handling the not found url's
app.use(notFound);

const start = async () => {
	try {
		// await connectDB(process.env.MONGOOSE_URL)
		// .then(console.log("connecting to the database"));

		await connectDB("mongodb://127.0.0.1:27017/job_api")
		.then(console.log("connecting to the database"));

		app.listen(PORT, () => {
			console.log(`Listening on Port ${PORT}`);
		});

	} catch (error) {
		console.log(error);
	}
};
start();
