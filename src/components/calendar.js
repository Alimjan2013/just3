import ThingsInCalendar from "./thingsInCalendar";
import { getRangeArray, compareTwoArray } from "../dateRange";

const today = new Date(Date.now());

const combinedThings = (weekArray, thingsArray) => {
  weekArray.map((day, index) => {
    if (day.status) {
      const things = thingsArray.filter(
        (item) => new Date(item.date).getDate() === new Date(day.date).getDate()
      );
      day.things = things[0].things;
      day.key = things[0]._id;
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
    <ThingsInCalendar
      date={day.date}
      things={day.things}
      key={day.key}
      isExist={day.status}
    />
  ));
  return <div className="flex ">{oneWeekcalendar}</div>;
};

export default Weekcalendar;
