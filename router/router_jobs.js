import express from "express";
import AuthMiddleware from "../middleware/authentication.js";
import {
	getJob,
	getAllJob,
	updateJob,
	createJob,
	deleteJob,
} from "../controller/job.js";
const Router = express.Router();

// Router.get("/", getAllJob);
// Router.post("/", createJob);
// Router.get("/:id", getJob);
// Router.patch("/:id", updateJob);
// Router.get("/:id", deleteJob);

Router.route("/")
	.get(getAllJob)
	.post(createJob);
	
Router.route("/:id")
	.get(getJob)
	.delete(deleteJob)
	.patch(updateJob);

export default Router;
