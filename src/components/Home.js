import React, { Component } from "react";

import UserService from "../services/UserService";
import RecommendationCreate from "./RecommendationCreate";
import RecommendationList from "./RecommendationList";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Create Recommendations</h1>
                <RecommendationCreate />
                <hr />
                <h1>Recommendations</h1>
                <RecommendationList />
            </div>
        );
    }
}