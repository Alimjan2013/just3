import ThingsInCalendar from "./thingsInCalendar";

const Weekcalendar = (props) => {
  const oneWeekcalendar = props.things.map((things) => (
    <ThingsInCalendar things={things} key={things._id} isExist={true} />
  ));
  // todo , 剩下的日期
  return (
    <div className="flex ">
      {oneWeekcalendar}
      <ThingsInCalendar things={props.things[0]} isExist={false} />
      <ThingsInCalendar things={props.things[0]} isExist={false} />
      <ThingsInCalendar things={props.things[0]} isExist={false} />
      <ThingsInCalendar things={props.things[0]} isExist={false} />
      <ThingsInCalendar things={props.things[0]} isExist={false} />
    </div>
  );
};

export default Weekcalendar;
