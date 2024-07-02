import express from "express";
import { user_collection, team_collection } from "./database.js";
import cors from "cors";
import { fileURLToPath } from "url";
import {dirname} from "path";
import path from "path";

const PORT = process.env.PORT | 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const web = express();
web.use(express.urlencoded({ extended: false }));
web.use(express.json());
web.use(cors());

web.get("/userdata", async (req, res) => {
    try {
        const data = await user_collection.find({});

        data != null ? res.status(200).send(data) : res.status(200).send(null);
    } catch (error) {
        console.log(`error occured while getting all the user data ${error}`)
    }
})
web.post("/filteredItem", async (req, res) => {
    try {
        const { gender, availability, domain } = req.body;
        let data = null;

        if (domain == undefined && availability == undefined && gender == undefined) {
            data = await user_collection.find();
        } else if (gender != undefined && availability != undefined && domain != undefined) {
            data = await user_collection.find({ domain: domain, available: availability, gender: gender });
        } else if (gender == undefined && availability == undefined) {
            data = await user_collection.find({ domain: domain })
        } else if (gender == undefined && domain == undefined) {
            data = await user_collection.find({ available: availability })
        } else if (domain == undefined && availability == undefined) {
            data = await user_collection.find({ gender: gender })
        } else if (gender == undefined) {
            data = await user_collection.find({ domain: domain, available: availability })
        } else if (availability == undefined) {
            data = await user_collection.find({ domain: domain, gender: gender })
        } else if (domain == undefined) {
            data = await user_collection.find({ available: availability, gender: gender })
        }

        data != null ? res.status(200).send(data) : res.status(200).send(data);
    } catch (error) {
        console.log(`error occured while getting filtered item =>>> ${error}`);
    }
})
web.post("/searchItem", async (req, res) => {
    try {
        const { search } = req.body;
        const data = await user_collection.find({ first_name: new RegExp(`^(${search})`, "i") })

        data != null ? res.status(200).send(data) : res.status(200).send(null);
    } catch (error) {
        console.error(`error occured while getting searched user =>>> ${error}`);
    }
})
web.post("/createTeam", async (req, res) => {
    try {
        const { teamName, team } = req.body;
        const isTeamExist = await team_collection.findOne({ teamName: teamName });

        if (isTeamExist == null) {
            
            team.forEach(async t => {
                await user_collection.updateOne({ id: t.id }, { $set: { available: false } })
            })
            const temp = new team_collection({
                teamName: teamName,
                members: team
            })
            const data = await temp.save();
            data != null ? res.status(200).send(true) : res.status(200).send(false);
        } else {
            res.status(200).send("alreadyExist");
        }
    } catch (error) {
        console.error(`error occured while creating the team =>> ${error}`);
    }
})
web.post("/showTeamName", async (req, res) => {
    try {
        const data = await team_collection.find({});
        data != null ? res.status(200).send(data) : res.status(200).send(null);
    } catch (error) {
        console.error(`error occured while getting the team names =>>> ${error}`)
    }
})
web.post("/removeUser", async (req, res) => {
    try {
        const { team, member } = req.body;
        const data = await team_collection.updateOne({ teamName: team }, {
            $pull: {
                members: {
                    id: member
                }
            }
        });
        await user_collection.updateOne({id:member},{$set:{available:true}});
        data.modifiedCount == 1 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`error while removing an user`);
    }
})

web.use(express.static(path.join(__dirname, "./Frontend/dist")))
web.get("*", (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, "./Frontend/dist/index.html"))        
    } catch (error) {
        console.error(`error while loading the frontend... =>>> ${error}`)
    }
})

web.listen(PORT, () => console.log(`server is running at port number ${PORT}`))