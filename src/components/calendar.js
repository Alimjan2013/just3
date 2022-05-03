import { weekrange, getRangeArray, compareTwoArray } from "../dateRange";
import DayView from "./calendarView";
import { useState, useEffect } from "react";

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
  const oneWeekcalendar = props.weekArray.map((day, index) => (
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
  const calendar = (
    <Weekcalendar things={props.things} weekArray={props.weekArray} />
  );
  const weekName = ["日", "一", "二", "三", "四", "五", "六"];
  const NameOfWeek = weekName.map((name, index) => (
    <p className="text-center text-xs md:text-sm text-text-4 " key={index}>
      {name}
    </p>
  ));

  return (
    <div className="space-y-1 flex-1">
      <div className="grid gap-2 md:gap-4 xl:gap-6 grid-cols-7">
        {NameOfWeek}
      </div>
      {calendar}
    </div>
  );
};

const CalendarView = () => {
  // const range = {
  //   start: "2022-04-24",
  //   end: "2022-05-01T23:59:59",
  // };
  const [aday, setAday] = useState(new Date(Date.now()));
  const changeRange = (day) => {
    return weekrange(day);
  };
  const [range, setRange] = useState(changeRange(aday));
  const [thingsInAWeek, setThingsInAWeek] = useState([]);
  const [weekArray, setWeekArray] = useState([]);
  const [isThisWeek, setIsThisWeek] = useState(false);
  const lestWeek = () => {
    console.log("lestWeek");
    var startDay = new Date(range.start);
    let dayInLestWeek = startDay.setDate(range.start.getDate() - 1);
    setAday(new Date(dayInLestWeek));
    setRange(changeRange(new Date(dayInLestWeek)));
  };
  const nextWeek = () => {
    if (!isThisWeek) {
      console.log("NextWeek");
      var startDay = new Date(range.end);
      let dayInLestWeek = startDay.setDate(range.end.getDate() + 1);
      setAday(new Date(dayInLestWeek));
      setRange(changeRange(new Date(dayInLestWeek)));
    }
  };
  const isThisDayInThisWeek = (week) => {
    console.log("是本周嘛");
    console.log(week);
    week.map((things) => {
      if (
        new Date(things.CreatDate).getDate() === new Date(Date.now()).getDate()
      ) {
        console.log(new Date(things.CreatDate).getDate());
        setIsThisWeek(true);
      } else {
        setIsThisWeek(false);
      }
      return;
    });
  };

  const findThingsWithRange = (user_id, range) => {
    console.log(range);
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
        console.log("我在工作");
        setThingsInAWeek(json);
        weekArrayChange(json);
        isThisDayInThisWeek(json);
      });
  };
  const weekArrayChange = (weekfromDB) => {
    let week = compareTwoArray(getRangeArray(aday), weekfromDB);
    setWeekArray(combinedThings(week, weekfromDB));
    console.log("我在工作 weekArray");
    console.log(weekfromDB);
    console.log(week);
    console.log(combinedThings(week, weekfromDB));
  };
  const backThisWeek = () => {
    setAday(new Date(Date.now()));
    setRange(changeRange(new Date(Date.now())));
  };
  // const today = new Date(Date.now());
  // const range = weekBeforeTodayRange(today);

  useEffect(() => {
    findThingsWithRange("Alimjan", range);
  }, [aday, range]);

  let calendar;
  if (thingsInAWeek.length === 0) {
    calendar = "";
  } else {
    calendar = <WeekView things={thingsInAWeek} weekArray={weekArray} />;
  }
  let backtoThisWeek;
  useEffect(() => {
    console.log("我变了");
  }, [isThisWeek]);
  if (isThisWeek) {
    backtoThisWeek = "";
  } else {
    backtoThisWeek = (
      <div>
        <button className={"mx-auto "} onClick={() => backThisWeek()}>
          回到本周
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-2 flex flex-col items-center">
      <div className="flex w-full items-center px-2">
        <svg
          onClick={() => lestWeek()}
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

        {calendar}

        <svg
          onClick={() => nextWeek()}
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isThisWeek ? "text-text-2" : "text-text-4"}
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
      {backtoThisWeek}
    </div>
  );
};

export default CalendarView;
