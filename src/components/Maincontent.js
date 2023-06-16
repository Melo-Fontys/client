import React, {useEffect, useState} from "react";
import Feed from "./Feed";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import {useAuth} from "../contexts/AuthContext";

export default function Maincontent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchSong, setSearchSong] = useState('');
    const [user, setUser] = useState('');
    const [arraySongs, setArraySongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState('');
    const {currentUser} = useAuth();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const res = await axios.get("http://localhost:8004/users/email/" + currentUser.email);
        console.log(res.data)
        setUser(res.data);
    };

    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    const onSubmit = async (event) => {
        event.preventDefault();

        const user_id = user.user_id;

        await axios.post("http://localhost:8000/recommendations", {
            title, description, selectedSong, user_id
        });

        setTitle('')
        setDescription('')
        setSearchSong('')

    }

    const chosenSong = async (song) => {
        setSelectedSong(song.external_urls.spotify)
        setSearchSong(song.name)
        setArraySongs([])
    }

    const searchSongs = async (value) => {

        const res = await axios.get("http://localhost:8006/songs/" + value);
        console.log(res.data[0])
        setArraySongs(res.data)
        setSearchSong(value);
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
                                                      onChange={e => searchSongs(e.target.value)}/>
                                        <ListGroup as="ol">
                                            {arraySongs.map((song) => {
                                                return (
                                                    <ListGroup.Item action onClick={() => chosenSong(song)}
                                                                    as="li"
                                                                    className="d-flex justify-content-between align-items-start"
                                                    >
                                                        <div className="ms-2 me-auto">
                                                            <div className="fw-bold">{song.name}</div>
                                                            {song.artists[0].name}
                                                        </div>
                                                        <Badge bg="primary" pill>
                                                            {millisToMinutesAndSeconds(song.duration_ms)}
                                                        </Badge>
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                    </Form.Group>
                                </Form>
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
