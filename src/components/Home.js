import React, {Component} from "react";
import LeftSidebar from "./Leftsidebar";
import MainContent from "./Maincontent";
import Navbar from "./Navbar";
import RightSidebar from "./Rightsidebar";

export default class Home extends Component {
    render() {
        return (
            <>
                <Navbar/>
                <div className="container-fluid gedf-wrapper">
                    <div className="row">
                        <LeftSidebar/>
                        <MainContent/>
                        <RightSidebar/>
                    </div>
                </div>
            </>
        );
    }
}