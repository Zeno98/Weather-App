import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const Tempapp = () => {

    console.log(process.env);

    let [data, setData] = useState(null);
    let [search, setSearch] = useState('');

    const inputRef = useRef();

    

    useEffect(() => {
        


        const fetchApi = async () => {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}
            `

           const  response = await fetch(url);

            const resJson = await response.json();
            
            setData(resJson.main);
            
            
        }
        
        inputRef.current.focus();


        fetchApi();
    },[search]);



    function handleInput(e) {
        setSearch(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1));// for making first alphabet capital e.g.-> Abc but without e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1).charAt() the o/p is abc

    }

    return (
        <>
               
                <div className="weatherBody">
                    <h1 className="heading">Weather App</h1>
                    <input
                    className="inputData"
                        type="search"
                        ref={inputRef}
                        value={search}
                        placeholder="Search City"
                        onChange={handleInput}
                    />
                     {
                    data ? (

                        <>
                        <h1>{search.charAt(0).toUpperCase()+search.slice(1)}</h1>
                       <h2> {data.temp} <sup>°</sup><sup>C</sup> </h2>
                       <br/>
                       <h5>Min: {data.temp_min} <sup>°</sup><sup>C</sup> | Max:{data.temp_max} <sup>°</sup><sup>C</sup></h5>
                       </>
                       
                    ) :
                    (
                        
                        <p>{null}</p>
                    )
                }


                </div>

        </>

    )

}

export default Tempapp;