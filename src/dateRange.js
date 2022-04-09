const selectDateArray = (array) => {
  let dateFromDB = [];

  array.map((things) => {
    const thingsDate = dayOfBegin(new Date(things.date));
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

const weekrange = (date) => {
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

const getRangeArray = (range) => {
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

const compareTwoArray = (rangeArray, dateFromDB) => {
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
  console.log(compareResults);

  return compareResults;
};

const today = new Date("2022-04-09");
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