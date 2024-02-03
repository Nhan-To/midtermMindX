import mongoose from "mongoose"

const UserAuthSchema = mongoose.Schema({
    username: { type: String},
    password: { type: String},
})

const UserAuth = mongoose.model('UserAuth', UserAuthSchema);

export {UserAuth};