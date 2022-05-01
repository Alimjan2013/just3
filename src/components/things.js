import React, { useState, useEffect } from "react";

const Thing = (props) => {
  let thingName = props.thing;
  const [status, setState] = useState();

  useEffect(() => {
    setState(props.things[thingName]);
  }, []);

  const handleOnClick = () => {
    props.changestatus(thingName, !status);
    setState(!status);
  };
  return (
    <div className="flex-1 flex flex-col items-center space-y-2 ">
      <input
        onClick={() => {
          handleOnClick();
        }}
        className=" rounded-md bg-fill-2   w-20 h-20  border-4 border-black appearance-none checked:bg-green-1    "
        type="checkbox"
        defaultChecked={status}
      />
      <p>{thingName}</p>
    </div>
  );
};
const Things = (props) => {
  const ThingList = props.things.ThreeThings;
  let thingsGroup;
  const changestatus = (key, status) => {
    console.log(status);
    console.log();
    fetch(
      "https://rxvkdzbhzca45kuqjd3ein6sea0vhido.lambda-url.ap-east-1.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update",
          userID: props.things.userID,
          CreatDate: props.things.CreatDate,
          ThingName: key,
          ThingStatus: status,
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  if (ThingList === undefined) {
    thingsGroup = "";
  } else {
    thingsGroup = Object.keys(ThingList).map((item) => (
      <Thing
        key={item}
        things={props.things.ThreeThings}
        thing={item}
        changestatus={changestatus.bind()}
      />
    ));
  }

  return <div className="flex">{thingsGroup}</div>;
};

export default Things;
