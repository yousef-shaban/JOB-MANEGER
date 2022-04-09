import mongoose from "mongoose"
const connect = (uri) =>
{
    return mongoose.connect(uri)
}

export default (uri) =>
{
    return mongoose.connect(uri)
}