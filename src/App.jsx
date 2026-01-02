import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState(true); 
  const [is12Hr, setIs12Hr] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const displayHours = is12Hr ? hours % 12 || 12 : hours;
  const amPm = hours >= 12 ? "PM" : "AM";

  const day = date.toLocaleDateString("en-US", { weekday: "short" });

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div
      className={`${
        theme ? "bg-orange-500" : "bg-blue-500"
      } min-h-screen flex items-center justify-center p-4`}
    >
      <div
        className={`${
          theme ? "bg-black text-white" : "bg-white text-black"
        } w-full max-w-4xl rounded-2xl p-6 grid gap-6`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          {/* 12 / 24 Toggle */}
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <span>24</span>
            <label className="relative inline-block h-7 w-12 cursor-pointer rounded-full bg-gray-300 has-[:checked]:bg-gray-900">
              <input
                type="checkbox"
                className="sr-only"
                checked={is12Hr}
                onChange={(e) => setIs12Hr(e.target.checked)}
              />
              <span className="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-white transition-all peer-checked:start-6"></span>
            </label>
            <span>12</span>
          </div>

          {/* Theme Toggle */}
          <button onClick={() => setTheme(!theme)}>
            {theme ? <FaMoon size={22} /> : <FaSun size={22} />}
          </button>
        </div>

        {/* Clock */}
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center text-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">{day}</h1>
            <span className="text-sm opacity-70">Day</span>
          </div>

          <span className="hidden sm:block text-3xl">:</span>

          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">
              {pad(displayHours)}
            </h1>
            <span className="text-sm opacity-70">Hours</span>
          </div>

          <span className="hidden sm:block text-3xl">:</span>

          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">
              {pad(minutes)}
            </h1>
            <span className="text-sm opacity-70">Minutes</span>
          </div>

          <span className="hidden sm:block text-3xl">:</span>

          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">
              {pad(seconds)}
            </h1>
            <span className="text-sm opacity-70">Seconds</span>
          </div>
        </div>

        {/* AM / PM */}
        {is12Hr && (
          <div
            className={`mx-auto px-6 py-2 rounded-full text-white ${
              theme ? "bg-orange-500" : "bg-blue-500"
            }`}
          >
            {amPm}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
