import React, {useState} from "react";
import Feed from "./Feed";
import axios from "axios";
import Form from 'react-bootstrap/Form'

export default function Maincontent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchSong, setSearchSong] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:8000/recommendations", {
            title, description
        });

        setTitle('')
    }

    return (
        <>
            <div className="col-md-6 gedf-main">
                <div className="card gedf-card">
                    <div className="card-header">
                        <ul
                            className="nav nav-tabs card-header-tabs"
                            id="myTab"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    id="posts-tab"
                                    data-toggle="tab"
                                    href="#posts"
                                    role="tab"
                                    aria-controls="posts"
                                    aria-selected="true"
                                >
                                    Make a recommendation / post!
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="images-tab"
                                    data-toggle="tab"
                                    role="tab"
                                    aria-controls="images"
                                    aria-selected="false"
                                    href="#images"
                                >
                                    Images
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="posts"
                                role="tabpanel"
                                aria-labelledby="posts-tab"
                            >
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Title" value={title}
                                                      onChange={e => setTitle(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} value={description}
                                                      onChange={e => setDescription(e.target.value)}
                                                      placeholder="Description"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                        <Form.Control type="text" placeholder="Search" value={searchSong}
                                                      onChange={e => setSearchSong(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="images"
                                role="tabpanel"
                                aria-labelledby="images-tab"
                            >
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="customFile"
                                        />
                                        <label className="custom-file-label">
                                            Upload image
                                        </label>
                                    </div>
                                </div>
                                <div className="py-4"></div>
                            </div>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" onClick={onSubmit} className="btn btn-primary">
                                    Publish
                                </button>
                            </div>
                            <div className="btn-group">
                                <button
                                    id="btnGroupDrop1"
                                    type="button"
                                    className="btn btn-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-globe"></i>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="btnGroupDrop1"
                                >
                                    <a className="dropdown-item" href="#">
                                        <i className="fa fa-globe"></i> Public
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fa fa-users"></i> Friends
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fa fa-user"></i> Just me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Feed/>
            </div>
        </>
    );
}
