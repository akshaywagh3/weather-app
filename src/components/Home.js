import React, { useEffect, useState } from 'react'
import './Home.css';
import {AiOutlineSearch } from 'react-icons/ai'
import Clear from './images/Clear.png'
import HeavyRain from './images/HeavyRain.png'
import LightCloud from './images/LightCloud.png'
import Humi from './images/Humi.png'
import Wind from './images/wind.png'
import snow from './images/Snow.png'
import thunder from './images/Thunderstorm.png'
import LightRain from './images/LightRain.png'
import Mist from './images/Mist.png'

const Home = () => {
    
    const [data,setData]=useState({
        
        'celsius':'°C',
        'name':'Pune',
        'humidity':'humidity%',
        'speed':0,
        'description':'',
        'icon':'',
        

    })
    const [name,setName]=useState('');
    const[error,SetError]=useState(null);
    const handleClick= useEffect(()=>{
        
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=6ff828ad0aa80b8117cb65e020a3174b`;
            fetch(url)
            .then(response=>response.json())
            .then(res=>{

                
                const weatherData={
                    'celsius':res.main.temp ,
                    'name':res.name ,
                    'humidity':res.main.humidity,
                    'speed':res.wind.speed,
                    'description':res.weather[0].main,
                    'icon':res.weather[0].icon
                }
                setData(weatherData)
            }           
                
                
                )
            .catch(error=>SetError(error.message))
            
        
    })

  return (
    <div className='container'>
        <h1>Weather Forecast</h1>
        <div className='weather'>
            
            <div className='search'>
                <input type='text' placeholder='Enter city name' onChange={e=>setName(e.target.value)}></input>
                <button onClick={handleClick}><AiOutlineSearch /></button>
            </div>
            <div className='winfo'>
                {data.description==='Clear' && <img src={Clear} alt='' className='icon'></img>}
                {data.description==='Thunderstorm' && <img src={thunder} alt='' className='icon'></img>}
                {data.description==='Snow' && <img src={snow} alt='' className='icon'></img>}
                {data.description==='Clouds' && <img src={LightCloud} alt='' className='icon'></img>}
                {(data.description==='Rain') &&  <img src={HeavyRain} alt='' className='icon'></img>}
                {(data.description==='Drizzle') &&  <img src={LightRain} alt='' className='icon'></img>}
                {(data.icon==='50d') &&  <img src={Mist} alt='' className='icon'></img>}

                <h1>{Math.floor(data.celsius-273.15)}°c</h1>

                <h2>{data.name}</h2>
                <h3>{data.description}</h3>
                <div className='details'>
                    <div className='col'>
                    <img src={Humi} alt=''></img>
                        <div className='humidity'>
                            <p>{data.humidity}%</p>
                            <p>Hudmidity</p>
                        </div>
                    </div>
                    <div className='col'>
                    <img src={Wind} alt=''></img>
                        <div className='wind'>
                            <p>{data.speed}m/s</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home