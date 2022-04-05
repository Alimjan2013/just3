import ThingsInCalendar from "./thingsInCalendar";
const getNextDayString = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? `0${(date.getMonth() + 1).toString()}`
      : date.getMonth() + 1;
  const day =
    date.getDate() < 10
      ? `0${(date.getDate() + 1).toString()}`
      : date.getDate();
  return { year: year, month: month, day: day };
};

const Weekcalendar = (props) => {
  const oneWeekcalendar = props.things.map((things) => (
    <ThingsInCalendar things={things} key={things._id} isExist={true} />
  ));

  // todo , 考虑本来没有创建的日子
  const lefeDays = [];
  for (let i = 0; i < 7 - props.things.length; i++) {
    let date;
    if (i === 0) {
      date = props.things[props.things.length - 1].date;
    } else {
      date = lefeDays[lefeDays.length - 1].date;
    }
    let dataString = getNextDayString(new Date(date));
    const trydateStart = `${dataString.year}-${dataString.month}-${dataString.day}T00:00:00`;
    date = new Date(trydateStart);
    const things = {
      date: date,
    };
    lefeDays.push(things);
  }
  const leftDaysInWeekcalendar = lefeDays.map((things, index) => (
    <ThingsInCalendar things={things} key={index} isExist={false} />
  ));

  return (
    <div className="flex ">
      {oneWeekcalendar}
      {leftDaysInWeekcalendar}
    </div>
  );
};

export default Weekcalendar;
