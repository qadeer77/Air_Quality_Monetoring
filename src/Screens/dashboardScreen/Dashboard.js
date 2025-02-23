import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ];

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
        { title: "PM2.5 Levels", value: data.iaqi.pm25?.v || "N/A" },
        { title: "PM10 Levels", value: data.iaqi.pm10?.v || "N/A" },
      ]);
      setAdditionalData(data.iaqi);
      setWeatherAdvice(data.dominentpol);
      setShowAdvice(true);
      setBackgroundClass(getBackgroundClass(data.aqi));
    } catch (error) {
      console.error("Error fetching data:", error);
      setCardData([
        { title: "Current AQI", value: "Error" },
        { title: "PM2.5 Levels", value: "Error" },
        { title: "PM10 Levels", value: "Error" },
      ]);
      setWeatherAdvice("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = aqi => {
    if (aqi <= 50) return "from-green-400 to-green-800";
    if (aqi <= 100) return "from-yellow-400 to-yellow-800";
    if (aqi <= 150) return "from-orange-300 to-orange-800";
    if (aqi <= 200) return "from-red-300 to-red-400";
    if (aqi <= 350) return "from-red-900 to-red-700";
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

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${backgroundClass} p-8 transition-all duration-500`}
    >
      <Navbar />
      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleCitySubmit} className="flex gap-4">
            <input
              type="text"
              value={inputCity}
              onChange={handleCityChange}
              placeholder="Search city..."
              className="flex-1 p-3 rounded-xl border-2 border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white/30 hover:bg-white/40 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              🔍 Search
            </button>
          </form>

          {/* City Quick Select */}
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  city === c
                    ? "bg-white/40 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white/90"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  {["🌤️", "📉", "📈"][index]}
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {card.title}
                </h2>
              </div>
              <p className="text-4xl font-bold text-white">
                {loading ? "..." : card.value}
                {index > 0 && <span className="text-lg ml-2">µg/m³</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Weather Advice */}
        {showAdvice && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-xl animate-fadeIn">
            <h2 className="text-xl font-semibold text-white mb-3">
              ⚠️ Health Advisory
            </h2>
            <p className="text-white/90 leading-relaxed">
              {weatherAdvice === "pm25" && (
                <>
                  High PM2.5 levels detected. Consider reducing outdoor
                  activities and using air purifiers indoors.
                </>
              )}
              {weatherAdvice === "pm10" && (
                <>
                  Elevated PM10 particles present. Sensitive groups should take
                  precautions when going outside.
                </>
              )}
              {weatherAdvice === "o3" && (
                <>
                  Ozone levels are rising. Avoid prolonged exposure during peak
                  sunlight hours.
                </>
              )}
              {weatherAdvice === "Fetching data..." && weatherAdvice}
              {weatherAdvice === "Failed to fetch data. Please try again." &&
                weatherAdvice}
            </p>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
