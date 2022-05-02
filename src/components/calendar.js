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
  return <div className="flex ">{oneWeekcalendar}</div>;
};

export default Weekcalendar;
