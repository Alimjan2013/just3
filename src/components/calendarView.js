const DayAtom = (props) => {
  const date = new Date(props.date).getDate();
  let status = props.status;
  //   console.log(status);
  let isBeginOfMouth = false;
  if (date === 1) {
    isBeginOfMouth = true;
  }
  let isToday = false;
  let today = new Date(Date.now()).getDate();
  if (date === today) {
    isToday = true;
    status = true;
  }
  return (
    <div className="">
      <p
        className={
          "text-sm md:text-lg " +
          (status ? "text-text-5 " : "text-text-3 ") +
          (isToday ? "bg-green-1 rounded-full" : " ") +
          (isBeginOfMouth ? "border-b-2 border-b-green-1 " : " ")
        }
      >
        {date}
      </p>
    </div>
  );
};

const ThingsRing = (props) => {
  const status = props.status;
  return (
    <div
      className={
        " w-[0.3rem] h-[0.3rem] md:h-2 md:w-2 rounded-full  " +
        (status ? "bg-green-1" : "bg-fill-4")
      }
    ></div>
  );
};

const ThingsRingGroup = (props) => {
  let group;
  if (props.things === undefined || props.things === null) {
    group = [1, 2, 3].map((thingsStatus, index) => <ThingsRing key={index} />);
  } else {
    const thingsdetails = Object.values(props.things);
    group = thingsdetails.map((thingsStatus, index) => (
      <ThingsRing status={thingsStatus} key={index} />
    ));
  }

  return <div className="flex space-x-1 md:space-x-2">{group}</div>;
};

const DayView = (props) => {
  return (
    <div className="flex flex-1 flex-col space-y-1 items-center">
      <DayAtom status={props.status} date={props.date} />
      <ThingsRingGroup things={props.things} />
    </div>
  );
};

export default DayView;
