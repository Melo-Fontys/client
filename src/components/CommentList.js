import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../contexts/AuthContext";

const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);
    const {currentUser} = useAuth();

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

        return (
            <>
                <div className="coment-bottom bg-white p-2 px-4">
                    <div className="commented-section mt-2">
                        <div className="d-flex flex-row align-items-center commented-user">
                            <h5 className="mr-2">{currentUser.email}</h5>
                            {/*<span className="dot mb-1"></span><span*/}
                            {/*className="mb-1 ml-2">{" 4 hours ago"}</span>*/}
                        </div>
                        <div className="comment-text-sm">
                            <span>{content}</span>
                        </div>
                        <div className="reply-section">
                            <div className="d-flex flex-row align-items-center voting-icons">
                                {/*<i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i><i*/}
                                {/*className="fa fa-sort-down fa-2x mb-3 hit-voting"></i><span*/}
                                {/*className="ml-2">10</span><span className="dot ml-2"></span>*/}
                                <h6 className="ml-2 mt-1">Reply</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    });

    return <ul>{renderedComments}</ul>;
};

export default CommentList;
