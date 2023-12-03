const mongoose = require("mongoose");
const data = require("./data.json");

mongoose.connect("mongodb+srv://sahoosivasankar33:1498543163@heliverse.l8dq8wm.mongodb.net/heliVerse?retryWrites=true&w=majority")
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