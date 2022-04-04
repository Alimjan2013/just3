import React, { useState, useEffect } from "react";
import Things from "./components/things";
import ThingsInCalendar from "./components/thingsInCalendar";
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
      <div>{date.getMonth() + 1}</div>
      <div>{date.getDate()}</div>
    </div>
  );
  let calendar;
  if (things.length === 0) {
    calendar = "";
  } else {
    calendar = <ThingsInCalendar things={things} />;
  }

  return (
    <div className="space-y-20">
      {todydate}
      <Things things={things} />
      {calendar}
    </div>
  );
};

export default App;
