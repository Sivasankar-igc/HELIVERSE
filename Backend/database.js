const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HeliVerse")
    .then(() => console.log("HeliVerse Database is connected successfully"))
    .catch((err) => console.error(`error occured while connecting to the HeliVerse database =>>> ${err}`))

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    gender: { type: String },
    avatar: { type: String },
    domain: { type: String },
    available: { type: Boolean }
})
const teamSchema = new mongoose.Schema({
    teamName: { type: String, unique: true, required: true },
    members: [{ id:{type:Number}, avatar: { type: String }, name: { type: String }, email: { type: String }, gender: { type: String }, domain: { type: String } }]
})

const user_collection = new mongoose.model("userdata", userSchema);
const team_collection = new mongoose.model("teamdata", teamSchema);
module.exports = { user_collection, team_collection };