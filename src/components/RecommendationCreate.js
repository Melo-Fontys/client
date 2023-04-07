import React, {useState} from 'react'
import axios from "axios";
import styled from 'styled-components';

const RecommendationCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:8000/recommendations", {
            title
        });

        setTitle('')
    }
    return (
        <Container>
            <form onSubmit={onSubmit}>
                <FormGroup>

                </FormGroup>
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>

        </Container>
    )
}

export default RecommendationCreate

const Container = styled.div`

`;

const FormGroup = styled.div`

`;