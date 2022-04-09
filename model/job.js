import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import {} from "dotenv/config";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please Provide Company Name"],
        maxlength: 50
    },
    position: {
        type: String,
        require: [true, "Please Provide Position"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["Interview", "Declined", "Pending"],
        default: "Pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please Provide User"]
    }
}, {timestamps: true})

export default mongoose.model("Job", jobSchema)