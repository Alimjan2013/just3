import React, { useState, useEffect } from "react";
import Things from "./components/things";
import Weekcalendar from "./components/calendar";
import "./index.css";
const getDayString = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? `0${(date.getMonth() + 1).toString()}`
      : date.getMonth() + 1;
  const day =
    date.getDate() < 10 ? `0${date.getDate().toString()}` : date.getDate();
  return { year: year, month: month, day: day };
};
const getAWeek = () => {
  const Adate = new Date(Date.now());
  const ADayInAWeek = Adate.getDay();
  Adate.setDate(Adate.getDate() - ADayInAWeek);
  const datestart = getDayString(Adate);
  const trydateStart = `${datestart.year}-${datestart.month}-${datestart.day}T00:00:00`;
  const weekStart = new Date(trydateStart);

  const dateend = getDayString(new Date(Date.now()));
  const trydateEnd = `${dateend.year}-${dateend.month}-${dateend.day}T23:59:59`;
  const weekEnd = new Date(trydateEnd);
  return {
    start: weekStart,
    end: weekEnd,
  };
};

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
    const range = getAWeek();
    fetch("https://qcuud7.api.cloudendpoint.cn/findThingInRange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id, range: range }),
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

  let todydate;
  const date = new Date(things.date);
  todydate = (
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
      {todydate}
      <Things things={things} />
    </div>
  );
};

export default App;
