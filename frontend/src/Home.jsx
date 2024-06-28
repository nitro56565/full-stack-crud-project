import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchApi = async()=>{
      try {
        const res = await axios.get('http://localhost:3000/api/data')
        setData(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi()
  },[data])

  const deleteHandl = async(id)=>{
    try {
      await axios.delete(`http://localhost:3000/api/data/${id}`)    
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <h1>Mahesh's World</h1>
      <h3>Total data is {data.length}</h3>
      <button><Link to={'/new'}>Add New Data</Link></button>
      {data.map((value)=>(
        <div className='box' key={value.id}>
          <p>{value.id} {value.color}<br></br>{value.value}</p>
          <button><Link to={`/update/${value.id}`}>Update</Link></button>
          <button onClick={e=>deleteHandl(value.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default Home