import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";
import {} from "dotenv/config";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Provide name"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		requred: [true, "Please Provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please Provide Valid Email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please Provide Password"],
		minlength: 6
	},
});

UserSchema.pre("save", async function(next){
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

UserSchema.methods.createJWT = function (){

	return Jwt.sign(
		{ UserName: this.name, UserId: this._id },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
}

UserSchema.methods.compare = async function (canditatePassword)
{
	const ismatch = await bcrypt.compare(canditatePassword, this.password)
	return ismatch;
}
export default mongoose.model("User", UserSchema)