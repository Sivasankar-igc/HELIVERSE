import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/filterSection.css";
import "../CSS/userCard.css";
import "../CSS/nav.css";
import "../CSS/pagination.css";
import "../CSS/popupbox.css";

const HomePage = () => {

    const [Records, setRecords] = useState([]);
    const [gender, setGender] = useState(undefined);
    const [availability, setAvailability] = useState(undefined);
    const [domain, setDomain] = useState(undefined);
    const [search, setSearch] = useState("");
    const [canShowButtons, setCanShowButtons] = useState(false);
    const [canShowPopup, setCanShowPopup] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [team, setTeam] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/userdata")
            .then((res) => res.data != null ? setRecords(res.data) : window.alert("Something went wrong while getting the user data"))
            .catch((err) => console.error(err))
    }, [])
    useEffect(() => {
        axios.post("/filteredItem", { gender, availability, domain })
            .then((res) => res.data != null ? setRecords(res.data) : window.alert("Something went wrong"))
            .catch((err) => console.error(`error from filteredFunction =>>> ${err}`))
    }, [gender])
    useEffect(() => {
        axios.post("/filteredItem", { gender, availability, domain })
            .then((res) => res.data != null ? setRecords(res.data) : window.alert("Something went wrong"))
            .catch((err) => console.error(`error from filteredFunction =>>> ${err}`))
    }, [availability])
    useEffect(() => {
        axios.post("/filteredItem", { gender, availability, domain })
            .then((res) => res.data != null ? setRecords(res.data) : window.alert("Something went wrong"))
            .catch((err) => console.error(`error from filteredFunction =>>> ${err}`))
    }, [domain])
    useEffect(() => {
        axios.post("/searchItem", { search })
            .then((res) => res.data && setRecords(res.data))
            .catch((err) => console.error(`error at searching the user from the search tab =>>> ${err}`))
    }, [search])

    const rotateArrow = (arrow, index) => {

        let dropDownList = document.querySelectorAll(".filter .opt-list");

        if (dropDownList.length != 0) {
            setTimeout(() => {
                dropDownList[index].classList.toggle("showList");
            }, 200)
            arrow.classList.toggle("rotate-arrow");
        }
    }
    const showGenderFilteredItem = (item, value) => {
        setGender(value);
        item.innerText != "All" ? document.querySelector(".filter .gender .selected-opt").innerText = item.innerText : document.querySelector(".filter .gender .selected-opt").innerText = "Gender";
        rotateArrow(document.querySelector(".filter .gender .rotate-arrow"), 0);
    }
    const showAvailableFilteredItem = (item, value) => {
        setAvailability(value);
        item.innerText != "All" ? document.querySelector(".filter .availability .selected-opt").innerText = item.innerText : document.querySelector(".filter .availability .selected-opt").innerText = "Availability";;
        rotateArrow(document.querySelector(".filter .availability .rotate-arrow"), 1);
    }
    const showDomainFilteredItem = (item, value) => {
        setDomain(value)
        item.innerText != "All" ? document.querySelector(".filter .domain .selected-opt").innerText = item.innerText : document.querySelector(".filter .domain .selected-opt").innerText = "Domain";
        rotateArrow(document.querySelector(".filter .domain .rotate-arrow"), 2);
    }
    const storeTeamMembers = (id, avatar, name, email, gender, domain) => {
        team.push({ id: id, avatar: avatar, name: name, email: email, gender: gender, domain: domain });
    }
    const createTeam = () => {

        if (new RegExp("^[a-zA-Z][a-zA-Z]+[a-zA-Z]$").test(teamName)) {
            if (window.confirm("Are You Sure")) {
                axios.post("/createTeam", { teamName, team })
                    .then((res) => {
                        if (res.data == true) {
                            location.reload();
                        } else if (res.data == false) {
                            window.alert("Something went wrong");
                        } else if (res.data == "alreadyExist") {
                            window.alert("This team name has already been taken")
                        }
                        setCanShowButtons(false);
                        setCanShowPopup(false);
                        setTeam([])
                    })
                    .catch((err) => console.error(`error occured while creating team =>>> ${err}`))
            }
        } else {
            window.alert("Not a valid team name. Team name must contain only alphabets")
        }
    }
    return (
        <>
            <section className="wrapper">

                <div className="nav">
                    <input type="text" id="searchBar" placeholder="Search Here" onChange={(e) => { setSearch(e.target.value) }} />
                    <div className="btn__container">
                        {canShowButtons ? <button type="button" onClick={() => setCanShowPopup(true)}>Done</button> : <button type="button" onClick={() => setCanShowButtons(true)}>Create Team</button>}
                        <button onClick={() => navigate("/showTeam")}>Show Team</button>
                    </div>
                </div>
                {canShowPopup && <div className="popup__box"><input type="text" name="team__name" id="team__name" placeholder="Enter your team name e.g.: Alpha" onChange={(e) => setTeamName(e.target.value)} /><button onClick={() => createTeam()}>Create</button></div>}

                <div className="filter-section">
                    <div className="filter">
                        <div className="select-opt gender">
                            <div className="selected-opt">Gender</div>
                            <div className="arrow-mark" onClick={(e) => rotateArrow(e.target, 0)}></div>
                        </div>
                        <ul className="opt-list">
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Male")}>Male</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Female")}>Female</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Non-binary")}>Non-binary</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Genderfluid")}>Genderfluid</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Polygender")}>Polygender</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Agender")}>Agender</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Genderqueer")}>Genderqueer</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, "Bigender")}>Bigender</li>
                            <li onClick={(e) => showGenderFilteredItem(e.target, undefined)}>All</li>
                        </ul>
                    </div>
                    <div className="filter">
                        <div className="select-opt availability">
                            <div className="selected-opt">Availability</div>
                            <div className="arrow-mark" onClick={(e) => rotateArrow(e.target, 1)}></div>
                        </div>
                        <ul className="opt-list">
                            <li onClick={(e) => showAvailableFilteredItem(e.target, true)}>True</li>
                            <li onClick={(e) => showAvailableFilteredItem(e.target, false)}>False</li>
                            <li onClick={(e) => showAvailableFilteredItem(e.target, undefined)}>All</li>
                        </ul>
                    </div>
                    <div className="filter">
                        <div className="select-opt domain">
                            <div className="selected-opt">Domain</div>
                            <div className="arrow-mark" onClick={(e) => rotateArrow(e.target, 2)}></div>
                        </div>
                        <ul className="opt-list">
                            <li onClick={(e) => showDomainFilteredItem(e.target, "Finance")}>Finance</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, "Business Development")}>Business Development</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, "IT")}>IT</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, "UI Designing")}>UI Designing</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, "Management")}>Management</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, "Marketing")}>Marketing</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, "Sales")}>Sales</li>
                            <li onClick={(e) => showDomainFilteredItem(e.target, undefined)}>All</li>
                        </ul>
                    </div>
                </div>
                <div className="item__container">
                    {
                        Records.length != 0 && Records.slice(page * 20 - 20, page * 20).map((record, index) => (
                            <div className="item" key={record.id}>
                                <img src={record.avatar} />
                                <p style={{ color: "white" }}>{record.first_name}  {record.last_name}</p>
                                <p style={{ color: "#ff009c", WebkitTextStrokeColor: "#ff009c" }}>{record.email}</p>
                                <p style={{ color: "#9400ff", WebkitTextStrokeColor: "#9400ff" }}>{record.gender}</p>
                                <p style={{ color: "#2e00ff", WebkitTextStrokeColor: "#2e00ff" }}>{record.domain}</p>
                                {record.available ? <p style={{ color: "green", WebkitTextStrokeColor: "green" }}>Available</p> : <p style={{ color: "red", webkittextstrokecolor: "red" }}>Not Available</p>}
                                {
                                    record.available && canShowButtons ? <button type="button" onClick={() => storeTeamMembers(record.id, record.avatar, record.first_name + " " + record.last_name, record.email, record.gender, record.domain)}>Select</button> : ""
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="pagination">
                    <button onClick={() => page > 1 ? setPage(page - 1) : ""} style={page > 1 ? { backgroundColor: "blue" } : { backgroundColor: "#00000096" }}>Prev</button>
                    <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />
                    <div>/</div>
                    <div>{Math.floor(Records.length / 20) > 0 ? Math.floor(Records.length / 20) : 1}</div>
                    <button onClick={() => page < Math.floor(Records.length / 20) ? setPage(Number(page) + 1) : ""} style={page < 50 ? { backgroundColor: "blue" } : { backgroundColor: "#00000096" }}>Next</button>
                </div>
            </section>
        </>
    )
}

export default HomePage;