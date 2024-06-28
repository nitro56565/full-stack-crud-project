import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {

    const [color, setColor] = useState();
    const [value, setValue] = useState();
    const navigate = useNavigate()
    let {id} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:3000/api/data/${id}`)
        .then(res =>{
            setColor(res.data[0].color)
            setValue(res.data[0].value)
        })
        .catch(err=>{
            console.log(err);   
        })
    }, [])


    function submithndl(e){
        e.preventDefault()
        axios.patch(`http://localhost:3000/update/${id}`,{color,value})
        .then(res =>{
            navigate('/');
        })
        .catch(err=>{
            console.log(err);   
        })
    }

  return (
    <div>
        <p>Color:</p>
        <input type="text" value={color} onChange={(e)=>setColor(e.target.value)}/>
        <p>Value:</p>
        <input type='text' value={value} onChange={(e)=> setValue(e.target.value)}/><br></br><br></br>
        <button onClick={submithndl}>Submit</button>
    </div>
  )
}

export default Update