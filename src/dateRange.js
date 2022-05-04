const selectDateArray = (array) => {
  let dateFromDB = [];

  array.map((things) => {
    const thingsDate = dayOfBegin(new Date(things.CreatDate));
    dateFromDB.push(thingsDate);
    return dateFromDB;
  });
  // console.log(dateFromDB);
  return dateFromDB;
};

const dayOfBegin = (date) => {
  var datebegin = new Date(date);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? `0${(date.getMonth() + 1).toString()}`
      : date.getMonth() + 1;
  const day =
    date.getDate() < 10 ? `0${date.getDate().toString()}` : date.getDate();
  datebegin = new Date(`${year}-${month}-${day}T00:00:00`);
  return datebegin;
};

export const weekrange = (date) => {
  date = dayOfBegin(date);
  const dayOfWeek = date.getDay();
  var startDay = new Date(date);
  startDay.setDate(date.getDate() - dayOfWeek);
  var endDay = new Date(date);
  endDay.setDate(date.getDate() + (7 - dayOfWeek));
  endDay.setSeconds(-1);
  return { start: startDay, end: endDay };
};

export const weekBeforeTodayRange = (date) => {
  date = dayOfBegin(date);
  const startDay = weekrange(date).start;
  const endDay = new Date(date.setDate(date.getDate() + 1));
  endDay.setSeconds(-1);
  return { start: startDay, end: endDay };
};

export const getRangeArray = (date) => {
  const range = weekrange(date);
  var rangeDays = (range.end - range.start) / 1000 / 60 / 60 / 24;
  rangeDays = Math.ceil(rangeDays);
  const rangeArray = [];
  for (let index = 0; index < rangeDays; index++) {
    let date;
    if (index === 0) {
      date = range.start;
      // console.log(date);
      rangeArray.push(date);
      // return;
    } else {
      date = new Date(rangeArray[rangeArray.length - 1]);
      date.setDate(date.getDate() + 1);
      rangeArray.push(date);
    }
  }

  return rangeArray;
};
export const getRangeArrayNano = (range) => {
  console.log(range);
  var rangeDays = (range.end - range.start) / 1000 / 60 / 60 / 24;
  rangeDays = Math.ceil(rangeDays);
  const rangeArray = [];
  for (let index = 0; index < rangeDays; index++) {
    let date;
    if (index === 0) {
      date = range.start;
      // console.log(date);
      rangeArray.push(date);
      // return;
    } else {
      date = new Date(rangeArray[rangeArray.length - 1]);
      date.setDate(date.getDate() + 1);
      rangeArray.push(date);
    }
  }

  return rangeArray;
};
export const getMonthArray = (date) => {
  const day = new Date(date);
  const month =
    day.getMonth() + 1 < 10
      ? `0${(day.getMonth() + 1).toString()}`
      : day.getMonth() + 1;

  const nextMonth =
    day.getMonth() + 2 < 10
      ? `0${(day.getMonth() + 2).toString()}`
      : day.getMonth() + 2;

  const firstDayInMonth = new Date(`${day.getFullYear()}-${month}-01`);
  const firstDayInNextMonth = new Date(`${day.getFullYear()}-${nextMonth}-01`);
  const lastDayInMonth = new Date(
    firstDayInNextMonth.setDate(date.getDate() - 1)
  );
  lastDayInMonth.setSeconds(-1);
  const startOfFirstDay = weekrange(firstDayInMonth).start;
  const EndOfFirstDay = weekrange(lastDayInMonth).end;
  // const monthArray = getRangeArrayNano();
  return {
    start: startOfFirstDay,
    end: EndOfFirstDay,
  };
};

export const compareTwoArray = (rangeArray, dataFromDB) => {
  const dateFromDB = selectDateArray(dataFromDB);
  let compareResults = [];
  rangeArray.map((dateFromRange, index) => {
    let status = false;
    for (let i = 0; i < dateFromDB.length; i++) {
      if (dateFromRange.getTime() === dateFromDB[i].getTime()) {
        status = true;
        break;
      }
    }
    compareResults.push({ date: dateFromRange, status: status });
    return compareResults;
  });
  // console.log(compareResults);

  return compareResults;
};

// const today = new Date("2022-04-09");
// const range = weekrange(today);
// const dateFromDB = selectDateArray(dataFromDB);
// console.log(getRangeArray(range));
// console.log(dateFromDB);
// compareTwoArray(getRangeArray(range), dateFromDB);
// selectDateArray(dataFromDB);
// console.log(range);
// console.log(weekBeforeTodayRange(today));
// console.log(weekBeforeTodayRange(today));
// console.log(getRangeArray(range));
