import { getRangeArray, compareTwoArray } from "../dateRange";
import DayView from "./calendarView";
import { weekBeforeTodayRange } from "../dateRange";
import { useState, useEffect } from "react";

import { atom } from "jotai";
import { useAtom } from "jotai";

const weekRanges = atom([]);

const today = new Date(Date.now());

const combinedThings = (weekArray, thingsArray) => {
  weekArray.map((day, index) => {
    if (day.status) {
      const things = thingsArray.filter(
        (item) =>
          new Date(item.CreatDate).getDate() === new Date(day.date).getDate()
      );
      day.things = things[0].ThreeThings;
      day.key = things[0].CreatDate;
    } else {
      day.key = index;
    }

    return weekArray;
  });
  return weekArray;
};

const Weekcalendar = (props) => {
  let weekArray = compareTwoArray(getRangeArray(today), props.things);
  weekArray = combinedThings(weekArray, props.things);
  const oneWeekcalendar = weekArray.map((day, index) => (
    <DayView
      status={day.status}
      things={day.things}
      date={day.date}
      key={day.key}
    />
  ));
  return (
    <div className="grid gap-2 md:gap-4 xl:gap-6 grid-cols-7">
      {oneWeekcalendar}
    </div>
  );
};

const WeekView = (props) => {
  const calendar = <Weekcalendar things={props.things} />;
  const weekName = ["日", "一", "二", "三", "四", "五", "六"];
  const NameOfWeek = weekName.map((name, index) => (
    <p className="text-center text-xs md:text-sm text-text-4 " key={index}>
      {name}
    </p>
  ));

  return (
    <div className="space-y-2 flex flex-col items-center">
      <div className="flex w-full items-center px-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fillOpacity="0.01" />
          <path
            d="M31 36L19 24L31 12"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="space-y-1 flex-1">
          <div className="grid gap-2 md:gap-4 xl:gap-6 grid-cols-7">
            {NameOfWeek}
          </div>
          {calendar}
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fillOpacity="0.01" />
          <path
            d="M19 12L31 24L19 36"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <button className="mx-auto ">回到本周</button>
    </div>
  );
};

const CalendarView = () => {
  const [thingsInAWeek, setThingsInAWeek] = useState([]);

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
    findThingsWithRange("Alimjan");
  }, []);

  let calendar;
  if (thingsInAWeek.length === 0) {
    calendar = "";
  } else {
    calendar = <WeekView things={thingsInAWeek} />;
  }
  return <div>{calendar}</div>;
};

export default CalendarView;
