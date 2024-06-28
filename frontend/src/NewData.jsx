import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NewData() {

    const [color, setColor] = useState('');
    const [value, setValue] = useState('');
    const [id, setId] = useState('');
    const [existingIds, setExistingIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing IDs from the server
        axios.get('http://localhost:3000/api/data')
            .then(res => {
                // Extract IDs from the data
                const ids = res.data.map(item => item.id);
                setExistingIds(ids);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function submithndl(e) {
        e.preventDefault();
        if (id === '' || color === '' || value === '') {
            alert('Please fill all the fields');
            return;
        }
        if (existingIds.includes(parseInt(id))) {
            alert('ID already exists. Please use a different ID.');
            return;
        }
        axios.post('http://localhost:3000/new', { id: parseInt(id), color, value })
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <p>Id:</p>
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
            <p>Color:</p>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
            <p>Value:</p>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} /><br /><br />
            <button onClick={submithndl}>Submit</button>
        </div>
    )
}

export default NewData;
