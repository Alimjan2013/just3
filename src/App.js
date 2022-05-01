import React, { useState, useEffect } from "react";
import Things from "./components/things";
import Weekcalendar from "./components/calendar";
import { weekBeforeTodayRange } from "./dateRange.js";
import "./index.css";
import axios from "axios";
import { nanoid } from "nanoid/non-secure";
const serviceId = "qcuud7";

const Login = () => {
  const [phoneNumber, usePhoneNumber] = useState("18958088769");

  const getPhoneCode = (phoneNumber) => {
    const localSessionKey = `light:${serviceId}:local-session`;
    if (!localStorage.getItem(localSessionKey)) {
      // 如果本地没有 token，则随机生成
      localStorage.setItem(localSessionKey, nanoid());
    }
    axios
      .post(
        "https://qcuud7.api.cloudendpoint.cn/login",
        {
          type: "getPhoneCode",
          phoneNumber: phoneNumber, // 发送用户的手机号作为参数
        },
        {
          headers: {
            // 请求头中需要设置 x-tt-session-v2，才能在服务端使用用户系统
            "x-tt-session-v2": localStorage.getItem(localSessionKey),
          },
        }
      )
      .then((res) => {
        console.log(res);
        // 请求成功
      })
      .catch((err) => {
        console.log(err);
        // 请求失败
      });
  };

  const loginWithPhoneCode = (code) => {
    const localSessionKey = `light:${serviceId}:local-session`;
    axios
      .post(
        "https://qcuud7.api.cloudendpoint.cn/login",
        {
          type: "login",
          phoneNumber: phoneNumber,
          code: code, // 发送用户的手机号作为参数
        },
        {
          headers: {
            // 请求头中需要设置 x-tt-session-v2，才能在服务端使用用户系统
            "x-tt-session-v2": localStorage.getItem(localSessionKey),
          },
        }
      )
      .then((res) => {
        console.log(res);
        // 请求成功
      })
      .catch((err) => {
        console.log(err);
        // 请求失败
      });
  };

  return (
    <div>
      <button onClick={() => getPhoneCode(phoneNumber)}> 获取验证码 </button>
      <input></input>
    </div>
  );
};

const App = () => {
  const [things, setThings] = useState({});
  const [thingsInAWeek, setThingsInAWeek] = useState([]);

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
  const findThingsWithRange = (user_id) => {
    const today = new Date(Date.now());
    const range = weekBeforeTodayRange(today);
    fetch("https://qcuud7.api.cloudendpoint.cn/findThingInRange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        range: range,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setThingsInAWeek(json.result);
      });
  };
  useEffect(() => {
    findThings("Alimjan");
    findThingsWithRange("Alimjan");
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
  let calendar;
  if (thingsInAWeek.length === 0) {
    calendar = "";
  } else {
    calendar = <Weekcalendar things={thingsInAWeek} />;
  }

  return (
    <div className="h-screen space-y-20 pb-32 pt-10 flex flex-col">
      {calendar}
      {todaydate}
      <Things things={things} />
      <Login />
    </div>
  );
};

export default App;
