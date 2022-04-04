// import React from "react";

const OneThingsitem = {
  _id: "624a35213fc2fb8fc6b737e4",
  userID: "Alimjan",
  things: { English: false, Coding: false, Workout: false },
  date: "2022-04-04T00:00:33.884Z",
  createdAt: "2022-04-04T00:00:33.885Z",
  updatedAt: "2022-04-04T00:00:33.885Z",
};

// const a = Object.values(OneThingsitem.things);

const ThingsRing = (props) => {
  const status = props.status;
  const bgc = status ? "green-1" : "fill-4";
  console.log(bgc);
  return (
    <div
      className={
        " w-2 h-2 rounded-full  " + (status ? "bg-green-1" : "bg-fill-4")
      }
    ></div>
  );
};

const ThingsRingGroup = (props) => {
  // const thingsdetails = Object.values(OneThingsitem.things);

  let group;
  if (props.thingsDetails === undefined || props.thingsDetails === null) {
    group = "";
  } else {
    const thingsdetails = Object.values(props.thingsDetails);
    group = thingsdetails.map((thingsStatus, index) => (
      <ThingsRing status={thingsStatus} key={index} />
    ));
  }

  return <div className="flex space-x-2">{group}</div>;
};
const WhatIsTodayInChinese = (number) => {
  switch (number) {
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
    case 0:
      return "周日";

    default:
      console.log("一周只有七天");
      return "异常";
  }
};

const ThingsInCalendar = (props) => {
  const date = new Date(props.things.date);
  const dayInAWeek = date.getDay();
  const dayInMonth = date.getDate();

  return (
    <div className="flex flex-col  items-center p-1 space-y-1">
      <span className="text-xs">{WhatIsTodayInChinese(dayInAWeek)}</span>
      <span className="text-base">
        {dayInMonth < 10 ? `0${dayInMonth.toString()}` : dayInMonth}
      </span>
      <ThingsRingGroup thingsDetails={props.things.things} />
    </div>
  );
};

export default ThingsInCalendar;
