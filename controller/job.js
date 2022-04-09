import jobSchema from "../model/job.js";
import { unauthorized, badreq } from "../error/main.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import {} from "dotenv/config";

/////////////////////////////////
// const User_Validator = async (req, res, next) => {
// 	const job = await jobSchema.findOne({ _id: req.params.id });

// 	if (job.createdBy == req.user.UserId) {
// 		return {valid: true, job}
//     };
//     return false;
// }
/////////////////////////////////

const getAllJob = async (req, res, next) => {
	try {

        const jobs = await jobSchema.find({ createdBy: req.user.UserId });

		res.status(200).json({ jobs });
	} catch (error) {
		next(error);
	}
};

const getJob = async (req, res, next) => {
	try {

        const job = await jobSchema.findOne({_id: req.params.id, createdBy: req.user.UserId})
        if (!job) {
			throw new unauthorized("no jobs");
		}
        res.status(200).json({ job });

	} catch (error) {
		next(error);
	}
};

const createJob = async (req, res, next) => {
	try {
		req.body.createdBy = req.user.UserId;
		const job = await jobSchema.create(req.body);

		res.status(200).json({ job });
	} catch (error) {
		next(error);
	}
};


const updateJob = async (req, res, next) => {
	try {

        const updated = await jobSchema.findByIdAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user.UserId,
            },
            req.body,
            );

        if (!updated) {

            throw new unauthorized("no jobs");
            
        }
        res.status(200).json({ status: "updated", updated });

	} catch (error) {

        next(error)
    }
};

const deleteJob = async (req, res, next) => {
	try {

        const deletedJob = await jobSchema.deleteOne(
            {
                _id: req.params.id,
                createdBy: req.user.UserId,
            });

		if (!deletedJob || deletedJob.deletedCount === 0) {

			throw new badreq("no jobs");
        }
        res.status(200).json({ status: "Deleted" });

	} catch (error) {
		next(error);
	}
};
export { getAllJob, getJob, createJob, updateJob, deleteJob };
