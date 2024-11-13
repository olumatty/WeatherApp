"use client";
import React, { useState } from "react";
import Search from "../../public/search.png";
import Image from "next/image";
import Cloud from "../../public/cloud.png";
import Humidty from "../../public/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("New Delhi");

  const search = async () => {
    const url = `/api/weather?city=${city}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setWeatherData(result.current);
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:place-self-center items-center justify-center px-10 md:px-60 py-[60px]">
      <h1 className="font-bold text-3xl mb-3">Real-time WeatherApp</h1>
      <div className="border w-[100%] flex flex-col justify-center rounded-lg bg md:w-[50%]">
        <div className="flex flex-row justify-center items-center gap-3 p-8">
          <input
            type="text"
            placeholder="Search"
            className="outline-none border h-[36px] w-[240px] p-6 rounded-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="bg-[#ebfffc] w-[40px] h-[40px] rounded-full cursor-pointer" onClick={search}>
            <Image src={Search} height={20} alt="Search" className="mx-auto mt-3" />
          </div>
        </div>
        {weatherData && (
          <div className="font-semibold text-white">
            <h1 className="flex justify-center">{city}</h1>
            <div className="flex justify-around items-center">
              <div>
                <Image src={Cloud} height={60} width={60} alt="cloud" className="effect" />
                <p className="font-bold">{weatherData.weather_descriptions[0]}</p>
              </div>
              <div>
                <p className="text-3xl">{weatherData.temperature}°C</p>
              </div>
              <div>
                <p>Wind: {weatherData.wind_speed} kmph</p>
                <p>Precip: {weatherData.precip} mm</p>
                <p>Pressure: {weatherData.pressure} mb</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-6 mb-6 text-white font-semibold gap-2">
          <Image src={Humidty} height={30} width={30} alt="Humidty" />
          <div>
            <p className="text-xl">{weatherData ? weatherData.humidity : ""}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
