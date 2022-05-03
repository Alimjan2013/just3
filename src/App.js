import React, { useState, useEffect } from "react";
import Things from "./components/things";
import CalendarView from "./components/calendar";
import "./index.css";
import axios from "axios";

const App = () => {
  const [things, setThings] = useState({});

  const findThings = (userId) => {
    axios
      .post(
        "https://rxvkdzbhzca45kuqjd3ein6sea0vhido.lambda-url.ap-east-1.on.aws/",
        {
          userID: userId,
          type: "findTodayThings",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setThings(res.data[0]);
        // 请求成功
      })
      .catch((err) => {
        console.log(err);
        // 请求失败
      });
  };

  useEffect(() => {
    findThings("Alimjan");
  }, []);

  let todaydate;
  const date = new Date(things.CreatDate);
  todaydate = (
    <div className="text-5xl text-center flex-1">
      <div>
        {date.getMonth() + 1 < 10
          ? `0${(date.getMonth() + 1).toString()}`
          : date.getMonth() + 1}
      </div>
      <div>
        {date.getDate() < 10 ? `0${date.getDate().toString()}` : date.getDate()}
      </div>
    </div>
  );

  return (
    <div className="h-screen space-y-20 pb-32 pt-10 flex flex-col">
      <CalendarView />
      {todaydate}
      <Things things={things} />
    </div>
  );
};

export default App;
