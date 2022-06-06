import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loding,setloding]=useState(true);
  const [tours,settours]=useState([]);

  const removeToure=(id)=>{
    const newtours=tours.filter((tour)=>tour.id!==id)
    settours(newtours);
  }
  const fetchTours=async ()=>{
    setloding(true);
    try {
      const respons=await fetch(url);
      const tours =await respons.json();
      setloding(false);
      settours(tours)
    } catch (error) {
      setloding(false);
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchTours();
    
  },[]);

  if(loding){
    return <main>
    <Loading/>
    </main>  
  }
  if(tours.length===0){
    return(
    <main>
      <div className="title">
        <h2> no tours left</h2>
        <button className='btn' onClick={()=>fetchTours()}> refresh</button>
      </div>
    </main>)
  }
  return (
    <main>
      <Tours tours={tours} removeToure={removeToure}/>
    </main>
  );
}

export default App
