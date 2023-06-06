import React, {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const Feed = () => {
    const {currentUser} = useAuth();
    const [recommendations, setRecommendations] = useState([]);

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:8000/recommendations");
        setRecommendations(res.data);
    };

    useEffect(() => {
        console.log(recommendations);
    }, [recommendations]);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            {Object.values(recommendations).map((recommendation) => {
                console.log(recommendation)
                return (
                    <>
                        <div className="card gedf-card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="mr-2">
                                            <img
                                                className="rounded-circle"
                                                width="45"
                                                src="https://picsum.photos/50/50"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-2">
                                            <div className="h5 m-0">@{currentUser.email}</div>
                                            {/*<div className="h7 text-muted">Miracles Lee Cross</div>*/}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-link dropdown-toggle"
                                                type="button"
                                                id="gedf-drop1"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fa fa-ellipsis-h"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="gedf-drop1"
                                            >
                                                <div className="h6 dropdown-header">Configuration</div>
                                                <a className="dropdown-item" href="#">
                                                    Save
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Hide
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Report
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="text-muted h7 mb-2">
                                    {" "}
                                    <i className="fa fa-clock-o"></i>10 min ago
                                </div>
                                <a className="card-link" href="#">
                                    <h5 className="card-title">
                                        {recommendation.title}
                                    </h5>
                                </a>

                                <p className="card-text">
                                    {recommendation.description}
                                </p>
                            </div>
                            <CommentCreate postId={recommendation.id}/>
                            <CommentList postId={recommendation.id}/>
                        </div>

                    </>
                );
            })
            }
        </>
    );
}

export default Feed;
