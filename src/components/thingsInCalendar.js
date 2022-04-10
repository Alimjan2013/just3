// import React from "react";

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

// const a = Object.values(OneThingsitem.things);

const ThingsRing = (props) => {
  const status = props.status;
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

const ThingsInCalendar = (props) => {
  const date = new Date(props.date);
  const dayInAWeek = date.getDay();
  const dayInMonth = date.getDate();
  const status = { a: false, b: false, c: false };
  let ThingsInCalendarItem;
  if (props.isExist) {
    ThingsInCalendarItem = (
      <div className="flex flex-col  items-center p-1 space-y-1 flex-1">
        <span className="text-xs">{WhatIsTodayInChinese(dayInAWeek)}</span>
        <span className="text-base">
          {dayInMonth < 10 ? `0${dayInMonth.toString()}` : dayInMonth}
        </span>
        <ThingsRingGroup thingsDetails={props.things} />
      </div>
    );
  } else {
    ThingsInCalendarItem = (
      <div className="flex flex-col  items-center p-1 space-y-1 flex-1 text-text-2">
        <span className="text-xs">{WhatIsTodayInChinese(dayInAWeek)}</span>
        <span className="text-base">
          {dayInMonth < 10 ? `0${dayInMonth.toString()}` : dayInMonth}
        </span>
        {/* todo : before today 的颜色应该是另外一种 */}
        <ThingsRingGroup thingsDetails={status} />
      </div>
    );
  }
  return <div className=" w-full">{ThingsInCalendarItem}</div>;
};

export default ThingsInCalendar;
