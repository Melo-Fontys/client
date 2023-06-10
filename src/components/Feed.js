import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spotify} from "react-spotify-embed";

import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const Feed = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:8000/recommendations");
        setRecommendations(res.data);
    };

    const getUserById = async (id) => {
        const res = await axios.get("http://localhost:8004/users/" + id);
        setCurrentUser(res.data);
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

                if (recommendation.userId) {
                    getUserById(recommendation.userId);
                    console.log(currentUser)
                    return (
                        <div className="card gedf-card" key={recommendation.id}>
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
                                            <div className="h5 m-0">@{currentUser.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="text-muted h7 mb-2">
                                    {" "}
                                    <i className="fa fa-clock-o"></i>{recommendation.createdAt}
                                </div>
                                <a className="card-link" href="#">
                                    <h5 className="card-title">
                                        {recommendation.title}
                                    </h5>
                                </a>

                                <p className="card-text">
                                    {recommendation.description}
                                </p>
                                <Spotify wide link={recommendation.song}/>
                            </div>
                            <CommentCreate postId={recommendation.id}/>
                            <CommentList postId={recommendation.id}/>
                        </div>
                    );
                }
            })}
        </>
    );
}

export default Feed;
