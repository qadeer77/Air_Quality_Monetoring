import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import bgGood from "../../assets/bg-good.jpg.jpg";
import bgunhealthy from "../../assets/bg-unhealthy-sensitive.jpeg";
import bgveryunhealthy from "../../assets/bg-very-unhealthy.jpeg";

const suggestedCities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Delhi",
];

const getPrecautionMessage = aqi => {
  if (aqi <= 50)
    return {
      message: "Good air quality. Enjoy your day!",
      color: "border-green-600 text-green-600",
    };
  if (aqi <= 100)
    return {
      message: "Moderate air quality. Some may experience minor irritations.",
      color: "border-yellow-600 text-yellow-600",
    };
  if (aqi <= 150)
    return {
      message:
        "Unhealthy for sensitive groups. Consider reducing outdoor duration.",
      color: "border-orange-600 text-orange-600",
    };
  if (aqi <= 200)
    return {
      message: "Unhealthy. Limit outdoor exertion.",
      color: "border-red-600 text-red-600",
    };
  if (aqi <= 300)
    return {
      message:
        "Very unhealthy. It's best to avoid prolonged outdoor activities.",
      color: "border-purple-600 text-purple-600",
    };
  return {
    message: "Hazardous. Stay indoors and follow local advisories.",
    color: "border-gray-800 text-gray-800",
  };
};

const getBackgroundUrl = aqi => {
  // Return corresponding background image URLs – ensure these images exist in public/
  if (aqi === null) return "/default-bg.jpg";
  if (aqi <= 50) return bgGood;
  if (aqi <= 100) return bgunhealthy;
  if (aqi <= 150) return bgunhealthy;
  if (aqi <= 200) return bgveryunhealthy;
  if (aqi <= 300) return bgveryunhealthy;
  return bgGood;
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
  const [aqiValue, setAqiValue] = useState(null);
  const [precaution, setPrecaution] = useState({ message: "", color: "" });

  const API_KEY = process.env.REACT_APP_WAQI_API_KEY;
  const auth = getAuth();
  const navigate = useNavigate();

  const fetchData = useCallback(
    async selectedCity => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/${selectedCity}/?token=${API_KEY}`
        );
        const data = response.data.data;
        const currentAqi = data.aqi;
        setAqiValue(currentAqi);
        setCardData([
          { title: "Current AQI", value: currentAqi },
          {
            title: "PM2.5 Levels",
            value: data.iaqi.pm25 ? data.iaqi.pm25.v : "N/A",
          },
          {
            title: "PM10 Levels",
            value: data.iaqi.pm10 ? data.iaqi.pm10.v : "N/A",
          },
        ]);
        setPrecaution(getPrecautionMessage(currentAqi));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    fetchData(city);
  }, [city, fetchData]);

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

  const handleSuggestionClick = suggestedCity => {
    setCity(suggestedCity);
  };

  const bgUrl = getBackgroundUrl(aqiValue);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better contrast */}
      <div className=" min-h-screen p-6">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <form
            onSubmit={handleCitySubmit}
            className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-3"
          >
            <input
              type="text"
              value={inputCity}
              onChange={handleCityChange}
              placeholder="Enter city name"
              className="min-w-72 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
            >
              Search
            </button>
          </form>
          {/* Suggestions */}
          <div className="mb-6 flex text-white drop-shadow-lg  flex-wrap justify-center gap-3">
            {suggestedCities.map((suggestedCity, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestedCity)}
                className="px-4 py-2 border border-gray-300 text-gray-700 drop-shadow-2xl shadow-black font-semibold rounded-full bg-white bg-opacity-70 hover:bg-opacity-50 transition text-md"
              >
                {suggestedCity}
              </button>
            ))}
          </div>
          {/* Display Current City */}
          <div className="mb-4 text-center">
            <h2 className="text-3xl drop-shadow-xl font-bold text-gray-100">
              Air Quality in {city}
            </h2>
          </div>
          {/* Data Cards with Blur Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="p-6 animate-fadeIn bg-white bg-opacity-30 backdrop-blur-sm rounded-lg shadow-md"
              >
                <h2 className="text-xl text-center font-medium text-gray-100 mb-2">
                  {card.title}
                </h2>
                <p className="text-4xl text-center font-bold text-gray-100">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
          {/* Precaution / Health Advisory Popup */}
          {aqiValue !== null && (
            <div
              className={`mt-8 p-6 border-l-4 ${precaution.color} bg-white bg-opacity-30  backdrop-blur-sm rounded shadow-lg`}
            >
              <h2 className="text-2xl  font-medium text-gray-100 mb-2">
                Air Quality Advisory
              </h2>
              <p className="text-gray-100">{precaution.message}</p>
            </div>
          )}
          {/* Loading Spinner */}
          {loading && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
