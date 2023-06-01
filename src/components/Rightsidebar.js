import React from "react";
import {useAuth} from "../contexts/AuthContext";

export default function Rightsidebar() {
    const {currentUser, deleteCurrentUser} = useAuth();

    const deleteAccount = () => {
        deleteCurrentUser(currentUser)
    }

    const logout = () => {
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
                        <h5 className="card-title">Logout</h5>
                        <p className="card-text">
                            Sayonara
                        </p>
                        <button type="submit" onClick={logout} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
