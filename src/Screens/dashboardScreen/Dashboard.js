import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [city, setCity] = useState("karachi");
  const [inputCity, setInputCity] = useState("");
  const [cardData, setCardData] = useState([
    { title: "Current AQI", value: "Loading..." },
    { title: "PM2.5 Levels", value: "Loading..." },
    { title: "PM10 Levels", value: "Loading..." },
  ]);
  const [additionalData, setAdditionalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState(
    "from-blue-900 via-purple-500 to-pink-600"
  );
  const [weatherAdvice, setWeatherAdvice] = useState("Fetching data...");
  const [showAdvice, setShowAdvice] = useState(false);

  const API_KEY = "b794f2cd5d088a0954a775a8ec6423e4cb6e2023";

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Mumbai",
    "Beijing",
    "Berlin",
    "Moscow",
    "Dubai",
    "Cairo",
    "Bangkok",
    "Toronto",
    "Singapore",
    "Los Angeles",
    "Seoul",
    "Madrid",
    "Rome",
    "Istanbul",
    "Cape Town",
    "Buenos Aires",
    "Rio de Janeiro",
    "Mexico City",
    "Jakarta",
    "Kuala Lumpur",
    "Hong Kong",
    "Shanghai",
    "Delhi",
    "Barcelona",
    "Melbourne",
    "Amsterdam",
    "Vienna",
    "Lisbon",
    "Dublin",
    "Stockholm",
    "Zurich",
    "Geneva",
    "Athens",
    "Prague",
    "Warsaw",
    "Helsinki",
    "Oslo",
    "Copenhagen",
    "Brussels",
    "Manila",
    "Santiago",
    "Lima",
    "Bogotá",
  ];

  const fetchAQIData = async city => {
    setLoading(true);
    setShowAdvice(false);
    try {
      const response = await fetch(
        `https://api.waqi.info/feed/${city}/?token=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "error") {
        setCardData([
          { title: "Current AQI", value: "City not found" },
          { title: "PM2.5 Levels", value: "-" },
          { title: "PM10 Levels", value: "-" },
        ]);
        setWeatherAdvice(
          "City not found. Please check the name and try again."
        );
        setBackgroundClass("from-gray-800 to-black");
        setAdditionalData([]);
        setLoading(false);
        return;
      }

      const aqi = data.data.aqi || "N/A";
      const pm25 = data.data.iaqi?.pm25?.v || "N/A";
      const pm10 = data.data.iaqi?.pm10?.v || "N/A";
      const temperature = data.data.iaqi?.t?.v || "N/A";
      const humidity = data.data.iaqi?.h?.v || "N/A";
      const windSpeed = data.data.iaqi?.w?.v || "N/A";

      setCardData([
        { title: "Current AQI", value: `${aqi}` },
        { title: "PM2.5 Levels", value: `${pm25} µg/m³` },
        { title: "PM10 Levels", value: `${pm10} µg/m³` },
      ]);

      setAdditionalData([
        { title: "Temperature", value: `${temperature} °C` },
        { title: "Humidity", value: `${humidity} %` },
        { title: "Wind Speed", value: `${windSpeed} m/s` },
      ]);

      if (aqi <= 70) {
        setBackgroundClass("from-green-400 via-blue-400 to-green-500");
        setWeatherAdvice("Air quality is good. It's safe to go outside.");
      } else if (aqi <= 100) {
        setBackgroundClass("from-yellow-400 via-orange-400 to-yellow-600");
        setWeatherAdvice(
          "Air quality is moderate. Sensitive groups should be cautious."
        );
      } else if (aqi <= 150) {
        setBackgroundClass("from-orange-400 via-red-500 to-orange-600");
        setWeatherAdvice(
          "Unhealthy for sensitive groups. Consider limiting outdoor activities."
        );
      } else if (aqi <= 200) {
        setBackgroundClass("from-red-500 via-red-600 to-red-900");
        setWeatherAdvice("Unhealthy air quality. Limit outdoor activities.");
      } else if (aqi <= 300) {
        setBackgroundClass("from-red-600 via-black to-red-900");
        setWeatherAdvice("Very unhealthy air quality. Avoid going outside.");
      } else {
        setBackgroundClass("from-black to-gray-900");
        setWeatherAdvice(
          "Hazardous air quality! Stay indoors and use air purifiers."
        );
      }
      setShowAdvice(true);
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      setWeatherAdvice("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAQIData(city);
  }, [city]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity(""); // Clear the search bar
    }
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCitySelect = event => {
    setCity(event.target.value);
    setInputCity(""); // Clear the search bar
  };

  return (
    <div
      className={`font-sans bg-gradient-to-br ${backgroundClass} text-white min-h-screen`}
    >
      <header className="flex justify-between bg-black bg-opacity-30 backdrop-blur text-white py-4 px-10 shadow-lg">
        <div>
          <h1 className="text-4xl font-bold">🌍 Air Quality Dashboard</h1>
          <p className="text-white mt-2 ml-10">
            Monitor the air quality of your city in real-time.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="relative w-full max-w-md">
            <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm">
              <input
                type="text"
                value={inputCity}
                onChange={e => setInputCity(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search city"
                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                className="text-sm text-gray-700 bg-transparent pr-4 py-2 focus:outline-none"
                onChange={handleCitySelect}
              >
                <option value="" disabled selected>
                  Select
                </option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="bg-black bg-opacity-30 rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition-all duration-300 backdrop-blur-md"
                >
                  <h2 className="text-lg font-semibold text-gray-300 uppercase tracking-wider">
                    {card.title}
                  </h2>
                  <p className="text-3xl font-bold text-gray-100 mt-4">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {additionalData.map((card, index) => (
                <div
                  key={index}
                  className="bg-black bg-opacity-30 rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition-all duration-300 backdrop-blur-md"
                >
                  <h2 className="text-lg font-semibold text-gray-300 uppercase tracking-wider">
                    {card.title}
                  </h2>
                  <p className="text-3xl font-bold text-gray-100 mt-4">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {showAdvice && (
              <div className="mt-5 text-center bg-white bg-opacity-80 text-gray-900 rounded-lg shadow-lg p-4 max-w-xl mx-auto transition-transform transform scale-105">
                <h3 className="text-xl font-bold mb-4">⚠️ Important Notice!</h3>
                <p className="text-lg">{weatherAdvice}</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="text-white text-center py-4">
        <p>© 2025 Air Quality Monitoring</p>
      </footer>
    </div>
  );
};

export default Dashboard;
