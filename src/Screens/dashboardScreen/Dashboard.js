import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [city, setCity] = useState("karachi");
  const [inputCity, setInputCity] = useState("");
  const [cardData, setCardData] = useState([
    { title: "Current AQI", value: "Loading..." },
    { title: "PM2.5 Levels", value: "Loading..." },
    { title: "PM10 Levels", value: "Loading..." },
  ]);
  const [loading, setLoading] = useState(false); // Loader state

  const API_KEY = "b794f2cd5d088a0954a775a8ec6423e4cb6e2023";

  const fetchAQIData = async city => {
    setLoading(true); // Start loader
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
        setLoading(false);
        return;
      }

      const aqi = data.data.aqi || "N/A";
      const pm25 = data.data.iaqi?.pm25?.v || "N/A";
      const pm10 = data.data.iaqi?.pm10?.v || "N/A";

      setCardData([
        { title: "Current AQI", value: `${aqi}` },
        { title: "PM2.5 Levels", value: `${pm25} µg/m³` },
        { title: "PM10 Levels", value: `${pm10} µg/m³` },
      ]);
    } catch (error) {
      console.error("Error fetching AQI data:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchAQIData(city);
  }, [city]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-blue-900 via-purple-500 to-pink-600 text-white min-h-screen">
      <header className="bg-gray-700 text-white py-6 text-center shadow-lg">
        <h1 className="b text-4xl font-bold">🌍 Air Quality Dashboard</h1>
        <p className="text-white mt-2">
          Monitor the air quality of your city in real-time.
        </p>
      </header>

      <main className="container mx-auto p-6">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={inputCity}
            onChange={e => setInputCity(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-500 rounded-lg p-3 text-gray-900 focus:outline-none focus:none  w-72"
          />
          <button
            onClick={handleSearch}
            className="ml-4 border-2 border-gray-200 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none"
          >
            Search
          </button>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
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
        )}

        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            Learn More About Air Quality
          </h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.epa.gov/air-quality-index"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
            >
              Understanding the AQI
            </a>
            <a
              href="https://waqi.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
            >
              Global Air Monitoring
            </a>
            <a
              href="https://www.who.int/health-topics/air-pollution"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300"
            >
              WHO Guidelines
            </a>
          </div>
        </div>
      </main>

      <footer className=" text-white text-center py-4 mt-12">
        <p>© 2025 Air Quality Monitoring</p>
      </footer>

      {/* Inline Styles for Loader */}
      <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #ffffff;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
