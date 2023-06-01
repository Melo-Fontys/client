import React, {useState} from "react";
import axios from "axios";

const CommentCreate = ({postId}) => {
    const [content, setContent] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:8001/recommendations/${postId}/comments`, {
            content,
        });

        setContent("");
    };

    return (
        <div>
            <div className="card-footer">
                <a href="#" className="card-link">
                    <i className="fa fa-gittip"></i> Like
                </a>
                <a href="#" className="card-link">
                    <i className="fa fa-comment"></i> Comment
                </a>
                <a href="#" className="card-link">
                    <i className="fa fa-mail-forward"></i> Share
                </a>
            </div>
            <div className="coment-bottom bg-white p-2 px-4">
                <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                    <img className="img-fluid img-responsive rounded-circle mr-2"
                         src="https://i.imgur.com/qdiP4DB.jpg" width="38"/>
                    <input type="text" className="form-control mr-3"
                           placeholder="Add comment" value={content}
                           onChange={(e) => setContent(e.target.value)}/>
                    <button className="btn btn-primary" onClick={onSubmit} type="button">Comment</button>

                </div>
            </div>
        </div>
    );
};

export default CommentCreate;
