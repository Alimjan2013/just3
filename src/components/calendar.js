import ThingsInCalendar from "./thingsInCalendar";
import { getRangeArray, compareTwoArray } from "../dateRange";
import DayView from "./calendarView";

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

export const WeekView = (props) => {
  const calendar = <Weekcalendar things={props.things} />;
  const weekName = ["日", "一", "二", "三", "四", "五", "六"];
  const NameOfWeek = weekName.map((name, index) => (
    <p className="text-center text-xs md:text-sm text-text-4 " key={index}>
      {name}
    </p>
  ));

  return (
    <div className="space-y-2 flex flex-col items-center">
      <div className="flex w-full items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fill-opacity="0.01" />
          <path
            d="M31 36L19 24L31 12"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          <rect width="48" height="48" fill="white" fill-opacity="0.01" />
          <path
            d="M19 12L31 24L19 36"
            stroke="#333"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <button className="mx-auto ">回到本周</button>
    </div>
  );
};

export default WeekView;
