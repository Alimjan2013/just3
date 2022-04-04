import ThingsInCalendar from "./thingsInCalendar";

const Weekcalendar = (props) => {
  return (
    <div className="flex ">
      <ThingsInCalendar things={props.things} isExist={true} />
      <ThingsInCalendar things={props.things} isExist={true} />
      <ThingsInCalendar things={props.things} isExist={true} />
      <ThingsInCalendar things={props.things} isExist={false} />
      <ThingsInCalendar things={props.things} isExist={false} />
      <ThingsInCalendar things={props.things} isExist={false} />
      <ThingsInCalendar things={props.things} isExist={false} />
    </div>
  );
};

export default Weekcalendar;
