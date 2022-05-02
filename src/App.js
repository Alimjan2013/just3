import React, { useState, useEffect } from "react";
import Things from "./components/things";
import WeekView from "./components/calendar";
import { weekBeforeTodayRange } from "./dateRange.js";
import "./index.css";
import axios from "axios";

const App = () => {
  const [things, setThings] = useState({});
  const [thingsInAWeek, setThingsInAWeek] = useState([]);

  const findThings = (userId) => {
    axios
      .post(
        "https://rxvkdzbhzca45kuqjd3ein6sea0vhido.lambda-url.ap-east-1.on.aws/",
        {
          userID: userId,
          type: "findTodayThings",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setThings(res.data[0]);
        // 请求成功
      })
      .catch((err) => {
        console.log(err);
        // 请求失败
      });
  };

  const findThingsWithRange = (user_id) => {
    const today = new Date(Date.now());
    const range = weekBeforeTodayRange(today);
    fetch(
      "https://rxvkdzbhzca45kuqjd3ein6sea0vhido.lambda-url.ap-east-1.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: user_id,
          timeRange: range,
          type: "range",
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setThingsInAWeek(json);
      });
  };
  useEffect(() => {
    findThings("Alimjan");
    findThingsWithRange("Alimjan");
  }, []);

  let todaydate;
  const date = new Date(things.CreatDate);
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
    // calendar = <Weekcalendar things={thingsInAWeek} />;
    calendar = <WeekView things={thingsInAWeek} />;
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
