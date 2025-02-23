import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [city, setCity] = useState("Karachi");
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

  const API_KEY = process.env.REACT_APP_WAQI_API_KEY;

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
  ];

  const auth = getAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchData(city);
  }, [city]);

  const fetchData = async city => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.waqi.info/feed/${city}/?token=${API_KEY}`
      );
      const data = response.data.data;
      setCardData([
        { title: "Current AQI", value: data.aqi },
        { title: "PM2.5 Levels", value: data.iaqi.pm25.v },
        { title: "PM10 Levels", value: data.iaqi.pm10.v },
      ]);
      setAdditionalData(data.iaqi);
      setWeatherAdvice(data.dominentpol);
      setShowAdvice(true);
      setBackgroundClass(getBackgroundClass(data.aqi));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = aqi => {
    if (aqi <= 50) return "from-green-400 to-green-600";
    if (aqi <= 100) return "from-yellow-400 to-yellow-600";
    if (aqi <= 150) return "from-orange-400 to-orange-600";
    if (aqi <= 200) return "from-red-400 to-red-600";
    if (aqi <= 300) return "from-purple-400 to-purple-600";
    return "from-maroon-400 to-maroon-600";
  };

  const handleCityChange = e => {
    setInputCity(e.target.value);
  };

  const handleCitySubmit = e => {
    e.preventDefault();
    if (inputCity) {
      setCity(inputCity);
      setInputCity("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
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
