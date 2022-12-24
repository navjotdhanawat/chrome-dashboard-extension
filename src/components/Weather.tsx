import React, { useState, useEffect } from 'react';

const Weather: React.FC = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weather, setWeather] = useState({
    temperature: 'NA',
    weather: 'NA',
  });

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition((position: any) => {
      setLocation(position.coords);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=your-api-key`,
      )
        .then((response) => response.json())
        .then((data) => setWeather(data));
    });
  }, []);

  if (!location || !weather) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <p>The current weather at your location is: {weather.weather}</p>
      <p>The temperature is: {weather.temperature} degrees</p>
    </div>
  );
};

export default Weather;
