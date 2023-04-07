import React, {useEffect, useState} from "react";
import axios from "axios";

const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(
            `http://localhost:8001/recommendations/${postId}/comments`
        );

        setComments(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map((comment) => {

        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        } else if (comment.status === 'pending') {
            content = "This comment is waiting moderation";
        } else if (comment.status === "rejected") {
            content = "This comment has been rejected";
        }

        return <li key={comment.id}>{content}</li>;
    });

    return <ul>{renderedComments}</ul>;
};

export default CommentList;
