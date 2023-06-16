import React, {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import {CSVLink} from "react-csv";
import {useNavigate} from "react-router-dom";

export default function Rightsidebar() {
    const {currentUser, deleteCurrentUser} = useAuth();
    const [data, setData] = useState([]);
    const {logout, setError} = useAuth();
    const navigate = useNavigate();

    let headers = [
        {label: "ID", key: "id"},
        {label: "Title", key: "title"},
        {label: "Description", key: "description"},
        {label: "Song", key: "song"},
    ];

    const deleteAccount = async () => {

        const res = await axios.get("http://localhost:8004/users/email/" + currentUser.email);
        const user = res.data;
        await axios.delete("http://localhost:8004/users/" + user.id);
        // deleteCurrentUser();
        await logout();
        navigate("/login");
    }

    const deletePosts = async () => {
        const res = await axios.get("http://localhost:8004/users/email/" + currentUser.email);
        const user = res.data;
        console.log(user)
        await axios.delete("http://localhost:8000/recommendations/users/" + user.id);
        await axios.delete("http://localhost:8004/users/" + user.id);
    }

    const downloadData = async () => {
        const res = await axios.get("http://localhost:8004/users/email/" + currentUser.email);
        const user = res.data;

        const res2 = await axios.get("http://localhost:8000/recommendations/users/" + user.id);
        setData(res2.data)
        console.log(data)
    }

    useEffect(() => {

        downloadData();
    }, []);

    const logoutNow = () => {
        window.location.replace("/logout")
    }

    return (
        <>
            <div className="col-md-3">
                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">Delete account</h5>
                        <p className="card-text">
                            Click here if you want to nuke this account
                        </p>
                        <button type="submit" onClick={deleteAccount} className="btn btn-primary">
                            Delete account
                        </button>
                    </div>
                </div>
                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">Delete posts made</h5>
                        <p className="card-text">
                            Click here if you want to nuke these posts
                        </p>
                        <button type="submit" onClick={deletePosts} className="btn btn-primary">
                            Delete posts
                        </button>
                    </div>
                </div>
                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">Download User Data</h5>
                        <p className="card-text">
                            Click here if you want to grab all those juicy posts you made on this account
                        </p>
                        {data &&
                            <CSVLink data={data} headers={headers}>
                                Download me
                            </CSVLink>
                        }
                    </div>
                </div>
                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">Logout</h5>
                        <p className="card-text">
                            Sayonara
                        </p>
                        <button type="submit" onClick={logoutNow} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
