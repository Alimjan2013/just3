import ThingsInCalendar from "./thingsInCalendar";

const Weekcalendar = (props) => {
  return (
    <div className="flex ">
      <ThingsInCalendar things={props.things} />
      <ThingsInCalendar things={props.things} />
      <ThingsInCalendar things={props.things} />
      <ThingsInCalendar things={props.things} />
      <ThingsInCalendar things={props.things} />
      <ThingsInCalendar things={props.things} />
      <ThingsInCalendar things={props.things} />
    </div>
  );
};

export default Weekcalendar;
