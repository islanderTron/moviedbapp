import Carousel from "$app/components/carousel/page";
import Spin from "$app/components/sping/page";
import { useEffect, useState } from "react";

export default function Trending({ imageURL, fixedProviders, showOrder }) {
  const [trends, setTrends] = useState();
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    getTrendingData();
  }, [timeWindow]);

  // HTTP methods
  async function getTrendingData() {
    return fetch(`/api/tmdb/trending?time_window=${timeWindow}&total=10`, {
      method: "POST",
      body: JSON.stringify(fixedProviders),
    }).then(async (res: any) => {
      const data = (await res.json()).trending_data;
      setTrends(data);
    });
  }

  // Event Handler
  function updateTimeWindow(time: string): void {
    setTimeWindow(time);
  }

  // Render
  function renderSwitch() {
    return (
      <ul className="menu menu-horizontal bg-base-200 rounded-box ml-2">
        <li id="day" onClick={() => updateTimeWindow("day")}>
          <a className={timeWindow === "day" ? "active" : ""}>Day</a>
        </li>
        <li id="week" onClick={() => updateTimeWindow("week")}>
          <a className={timeWindow === "week" ? "active" : ""}>Week</a>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <div>
        <span className="text-2xl">Trending</span>
        {renderSwitch()}
      </div>

      {trends ? (
        <Carousel
          data={trends}
          imageURL={imageURL}
          fixedProviders={fixedProviders}
          showOrder={showOrder}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
}
