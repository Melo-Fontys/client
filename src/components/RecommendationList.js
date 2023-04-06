import React, {useEffect, useState} from 'react'
import axios from "axios";
import styled from 'styled-components';
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const RecommendationCreate = () => {
    const [recommendations, setRecommendations] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:8000/recommendations");
        setRecommendations(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(recommendations).map((recommendation) => {
        return (
            <div
                className="card"
                style={{width: "30%", marginBottom: "20px"}}
                key={recommendation.id}
            >
                <div className="card-body">
                    <h3>{recommendation.title}</h3>
                    <CommentList postId={recommendation.id}/>
                    <CommentCreate postId={recommendation.id}/>
                </div>
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};
export default RecommendationCreate

const Container = styled.div`

`;

const FormGroup = styled.div`

`;