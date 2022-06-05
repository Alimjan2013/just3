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
  const calendar = <Weekcalendar weekArray={props.weekArray} />;
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
const MonthView = () => {
  const [monthViewArray, setMonthViewArray] = useState([]);
  const today = () => {
    const day = new Date(Date.now());
    const year = day.getFullYear();
    const month =
      day.getMonth() + 1 < 10
        ? `0${(day.getMonth() + 1).toString()}`
        : toString(day.getMonth() + 1);
    const whichday =
      day.getDate() < 10
        ? `0${day.getDate().toString()}`
        : toString(day.getDate());
    console.log(`${year}-${month}-${whichday}`);
    return `${year}-${month}-${whichday}`;
  };
  const findThingsWithRange = (user_id) => {
    console.log("我在从数据库获取数据");
    fetch(
      "https://rxvkdzbhzca45kuqjd3ein6sea0vhido.lambda-url.ap-east-1.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: user_id,
          date: today(),
          mode: "month",
          type: "calendar",
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        // setThingsInAMonth(json);
        // let week = compareTwoArray(monthRangeArray, json);
        setMonthViewArray(json);
      });
  };

  useEffect(() => {
    findThingsWithRange("Alimjan");
  }, []);

  const oneMonthcalendar = monthViewArray.map((day, index) => (
    <DayView
      status={day.status}
      things={day.things}
      date={day.CreatDate}
      key={day.CreatDate}
    />
  ));
  console
    .log
    // getRangeArrayNano({
    //   start: new Date("2022-05-01"),
    //   end: new Date("2022-05-31T23:32:17"),
    // })
    ();
  const weekName = ["日", "一", "二", "三", "四", "五", "六"];
  const NameOfWeek = weekName.map((name, index) => (
    <p className="text-center text-xs md:text-sm text-text-4 " key={index}>
      {name}
    </p>
  ));
  return (
    <div className="space-y-1 flex-1">
      <p className="text-center">{new Date(Date.now()).getMonth() + 1}月</p>
      <div className="grid gap-2 md:gap-4 xl:gap-6 grid-cols-7">
        {NameOfWeek}
      </div>
      <div className="grid gap-2 md:gap-4 xl:gap-6 grid-cols-7">
        {oneMonthcalendar}
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [aday, setAday] = useState(new Date(Date.now()));
  const changeRange = (day) => {
    return weekrange(day);
  };
  const [range, setRange] = useState(changeRange(aday));
  const [thingsInAWeek, setThingsInAWeek] = useState([]);
  const [weekArray, setWeekArray] = useState([]);
  const [isThisWeek, setIsThisWeek] = useState(false);
  const [NowCalendarView, setNowCalendarView] = useState("week");
  const lestWeek = () => {
    var startDay = new Date(range.start);
    let dayInLestWeek = startDay.setDate(range.start.getDate() - 1);
    setAday(new Date(dayInLestWeek));
    setRange(changeRange(new Date(dayInLestWeek)));
  };
  const nextWeek = () => {
    if (!isThisWeek) {
      var startDay = new Date(range.end);
      let dayInLestWeek = startDay.setDate(range.end.getDate() + 1);
      setAday(new Date(dayInLestWeek));
      setRange(changeRange(new Date(dayInLestWeek)));
    }
  };
  const isThisDayInThisWeek = (week) => {
    week.map((things) => {
      if (
        new Date(things.CreatDate).getDate() === new Date(Date.now()).getDate()
      ) {
        setIsThisWeek(true);
      } else {
        setIsThisWeek(false);
      }
      return;
    });
  };

  const findThingsWithRange = (user_id, range) => {
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
        weekArrayChange(json);
        isThisDayInThisWeek(json);
      });
  };
  const weekArrayChange = (weekfromDB) => {
    let week = compareTwoArray(getRangeArray(aday), weekfromDB);
    setWeekArray(combinedThings(week, weekfromDB));
  };
  const backThisWeek = () => {
    setAday(new Date(Date.now()));
    setRange(changeRange(new Date(Date.now())));
  };

  useEffect(() => {
    findThingsWithRange("Alimjan", range);
  }, [aday, range]);

  let calendar;
  if (thingsInAWeek.length === 0 || NowCalendarView === "month") {
    calendar = "";
  } else if (NowCalendarView === "week") {
    calendar = (
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

        <WeekView things={thingsInAWeek} weekArray={weekArray} />

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
    );
  }

  let monthView;
  if (NowCalendarView === "month") {
    monthView = (
      <div className="w-full">
        <MonthView things={thingsInAWeek} weekArray={weekArray} />
      </div>
    );
  } else {
    monthView = "";
  }

  const changeView = () => {
    if (NowCalendarView === "week") {
      setNowCalendarView("month");
    } else if (NowCalendarView === "month") {
      setNowCalendarView("week");
    }
    console.log(NowCalendarView);
  };

  let backtoThisWeek;
  if (isThisWeek) {
    backtoThisWeek = (
      <div onClick={() => changeView()} className="mt-1 ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          className={
            "transition-transform" +
            (NowCalendarView === "month" ? "transform rotate-180  " : "")
          }
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fillOpacity="0.01" />
          <path
            d="M40 28L24 40L8 28"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10H40"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M8 18H40"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
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
      {calendar}
      {monthView}
      {backtoThisWeek}
    </div>
  );
};

export default CalendarView;
