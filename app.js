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
// import rateLimit from "ratelimiter"

// import { Router } from "./Routers/router.js";

const PORT = process.env.PORT || 3000;
const app = express();
// 
// middleware

// app.set("trust proxy", 1)
// app.use(rateLimit({
// 	windowMs: 15* 60 * 1000,
// 	max: 100
// }))

app.use(express.json());
app.use(helmet())
app.use(cors())
// app.use(xss())


// app.use(express.static("./view"));

app.get("/", (req, res)=>{
	res.send("jobs api")
})
// router
app.use("/api/v1/jobs", AuthMiddleware, JobsRouter);
app.use("/api/v1/auth", AuthRouter);

// error handling middleware
app.use(errorHandlerMiddleware);

// handling the not found url's
app.use(notFound);

const start = async () => {
	try {
		await connectDB(process.env.MONGOOSE_URL)
		.then(console.log("connecting to the database"));

		// await connectDB("mongodb://127.0.0.1:27017/job_api")
		// .then(console.log("connecting to the database"));

		app.listen(PORT, () => {
			console.log(`Listening on Port ${PORT}`);
		});

	} catch (error) {
		console.log(error);
	}
};
start();
