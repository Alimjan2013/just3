import React, { useState, useEffect } from "react";
import Things from "./components/things";
import Weekcalendar from "./components/calendar";
import "./index.css";

const App = () => {
  const [things, setThings] = useState({});
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
  useEffect(() => {
    findThings("Alimjan");
  }, []);

  let todydate;
  const date = new Date(things.date);
  todydate = (
    <div className="text-5xl text-center">
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
  if (things.length === 0) {
    calendar = "";
  } else {
    calendar = <Weekcalendar things={things} />;
  }

  return (
    <div className="space-y-20">
      {calendar}
      {todydate}
      <Things things={things} />
    </div>
  );
};

export default App;
