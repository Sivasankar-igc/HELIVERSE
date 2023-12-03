import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/showTeam.css";

const ShowTeam = () => {
    const [teamName, setTeamName] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:8000/showTeamName")
            .then((res) => res.data != null ? setTeamName(res.data) : window.alert("something went wrong"))
            .catch((err) => console.error(`error at frontend while getting the team names =>>> ${err}`))
    }, [])
    const removeUser=(team, member)=>{
        axios.post("http://localhost:8000/removeUser",{team,member})
        .then((res)=>res.data == true?location.reload():window.alert("something went wrong"))
        .catch((err)=>console.error(`error occured at the frontend while removing an user`))
    }
    return (
        <>
            <section className="showTeam__wrapper">
                {
                    teamName && teamName.map((team, index) => (
                        <div className="item__container" key={index}>
                            <div id="teamHead"><h4>Team {team.teamName}</h4></div>
                            <div className="item__wrapper">
                                {
                                    team.members.map((member, i) => (
                                        <div className="item" key={i}>
                                            <img src={member.avatar} alt="" />
                                            <p style={{ color: "white" }}>{member.name}</p>
                                            <p style={{ color: "#ff009c", WebkitTextStrokeColor: "#ff009c" }}>{member.email}</p>
                                            <p style={{ color: "#9400ff", WebkitTextStrokeColor: "#9400ff" }}>{member.gender}</p>
                                            <p style={{ color: "#2e00ff", WebkitTextStrokeColor: "#2e00ff" }}>{member.domain}</p>
                                            <button onClick={()=>removeUser(team.teamName, member.id)}>Remove</button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default ShowTeam;