import React, { useState, useEffect } from "react";
import Things from "./components/things";
import Weekcalendar from "./components/calendar";
import { weekBeforeTodayRange } from "./dateRange.js";
import "./index.css";

const App = () => {
  const [things, setThings] = useState({});
  const [thingsInAWeek, setThingsInAWeek] = useState([]);
  const findThings = (user_id) => {
    fetch("https://qcuud7.api.cloudendpoint.cn/findThing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result);
        setThings(json.result[0]);
      });
  };
  const findThingsWithRange = (user_id) => {
    const today = new Date(Date.now());
    const range = weekBeforeTodayRange(today);
    fetch("https://qcuud7.api.cloudendpoint.cn/findThingInRange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        range: range,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result);
        setThingsInAWeek(json.result);
      });
  };
  useEffect(() => {
    findThings("Alimjan");
    findThingsWithRange("Alimjan");
  }, []);

  let todaydate;
  const date = new Date(things.date);
  todaydate = (
    <div className="text-5xl text-center flex-1">
      <div>
        {date.getMonth() + 1 < 10
          ? `0${(date.getMonth() + 1).toString()}`
          : date.getMonth() + 1}
      </div>
      <div>
        {date.getDate() < 10 ? `0${date.getDate().toString()}` : date.getDate()}
      </div>
    </div>
  );
  let calendar;
  if (thingsInAWeek.length === 0) {
    calendar = "";
  } else {
    calendar = <Weekcalendar things={thingsInAWeek} />;
  }

  return (
    <div className="h-screen space-y-20 pb-32 pt-10 flex flex-col">
      {calendar}
      {todaydate}
      <Things things={things} />
    </div>
  );
};

export default App;
