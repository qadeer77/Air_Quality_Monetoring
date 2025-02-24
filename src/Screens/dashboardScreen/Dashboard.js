import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

// A helper function that returns a background gradient based on the AQI value.
const getBackgroundClass = aqi => {
  if (aqi <= 50) return "from-green-400 to-green-600";
  if (aqi <= 100) return "from-yellow-400 to-yellow-600";
  if (aqi <= 150) return "from-orange-400 to-orange-600";
  if (aqi <= 200) return "from-red-400 to-red-600";
  if (aqi <= 300) return "from-purple-400 to-purple-600";
  return "from-maroon-400 to-maroon-600";
};

const Dashboard = () => {
  const [city, setCity] = useState("Karachi");
  const [inputCity, setInputCity] = useState("");
  const [cardData, setCardData] = useState([
    { title: "Current AQI", value: "Loading..." },
    { title: "PM2.5 Levels", value: "Loading..." },
    { title: "PM10 Levels", value: "Loading..." },
  ]);
  const [loading, setLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState(
    "from-blue-900 via-purple-500 to-pink-600"
  );
  const [weatherAdvice, setWeatherAdvice] = useState("Fetching data...");
  const [showAdvice, setShowAdvice] = useState(false);

  const API_KEY = process.env.REACT_APP_WAQI_API_KEY;
  const auth = getAuth();
  const navigate = useNavigate();

  // Wrap fetchData in useCallback so that it's stable and can be added as a dependency
  const fetchData = useCallback(
    async selectedCity => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/${selectedCity}/?token=${API_KEY}`
        );
        const data = response.data.data;
        setCardData([
          { title: "Current AQI", value: data.aqi },
          {
            title: "PM2.5 Levels",
            value: data.iaqi.pm25 ? data.iaqi.pm25.v : "N/A",
          },
          {
            title: "PM10 Levels",
            value: data.iaqi.pm10 ? data.iaqi.pm10.v : "N/A",
          },
        ]);
        setWeatherAdvice(data.dominentpol);
        setShowAdvice(true);
        setBackgroundClass(getBackgroundClass(data.aqi));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY]
  );

  // Now include fetchData in dependency array to satisfy eslint-react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData(city);
  }, [city, fetchData]);

  // Update input field value
  const handleCityChange = e => {
    setInputCity(e.target.value);
  };

  // Submit the new city and trigger new API call
  const handleCitySubmit = e => {
    e.preventDefault();
    if (inputCity) {
      setCity(inputCity);
      setInputCity("");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} p-8`}>
      <Navbar />
      <form onSubmit={handleCitySubmit} className="mb-8">
        <input
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="p-2 rounded-lg border border-gray-300 mr-2"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-2xl">{card.value}</p>
          </div>
        ))}
      </div>
      {showAdvice && (
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-fadeIn">
          <h2 className="text-xl font-semibold text-white mb-3">
            ⚠️ Health Advisory
          </h2>
          <p className="text-white">{weatherAdvice}</p>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
