# 本代码运行在Lambda上
from datetime import date
from datetime import timedelta
import json
import requests


userID = 'Alimjan'


def initDate(Onedate):
    # TODO 需要判断输入的日期符不符合YYYY-MM-DD 的规范
    NewDate = date.fromisoformat(Onedate)
    return NewDate


def getDateRange(Onedate, mode):
    # 输入日期(yyyy-mm-dd)，返回此日期所在周的开始与结束
    # 默认 周日为开始，周六为结束，
    # TODO:后续改为 ISO 标准日历
    day = initDate(Onedate)

    def getWeekRange(Onedate):

        weekDay = date.isoweekday(Onedate)
        if(weekDay == 7):
            weekDay = 0
        start = Onedate - timedelta(days=weekDay)
        end = Onedate + timedelta(days=(6 - weekDay))
        return {'start': start, 'end': end}
    # 输入日期和模式（周或月）
    # 返回日期所在的周或月的开始和结束的日期

    def getMonthRange(Onedate):
        # 每月最后一天的获取方法：获取下一月的一号，再减一天
        # 输入一个日期
        # 返回这个日期所在月再日历中的日期列表，包括第一周包含上个月的日期和最后一周包含的下个月的开始
        year = Onedate.year
        mounth = Onedate.month
        firstDayInMonth = date(year, mounth, 1)
        start = getWeekRange(firstDayInMonth)['start']
        if(mounth < 12):
            lastDayInMonth = date(year, mounth+1, 1) - timedelta(days=1)
        else:
            lastDayInMonth = date(year+1, 1, 1) - timedelta(days=1)
        end = getWeekRange(lastDayInMonth)['end']
        return {'start': start, 'end': end}

    if(mode == 'week'):
        Range = getWeekRange(day)
    elif (mode == 'month'):
        Range = getMonthRange(day)
    else:
        # 如使用了其他mode，返回-1 代表错误
        Range = -1
    return Range


def getThingsFromDB(range, userID):
    # 输入时间范围与要查询的用户信息
    # 返回数据库中记录的Things信息数组
    start = date.isoformat(range['start'])
    end = date.isoformat(range['end'])
    # 数据库查询需要iso格式的时间字符串
    url = 'https://rxvkdzbhzca45kuqjd3ein6sea0vhido.lambda-url.ap-east-1.on.aws/'
    values = {
        "userID": userID,
        "type": "range",
        "timeRange": {
            "start": start,
            "end": end
        },
    }
    headers = {'Content-Type': 'application/json'}
    thingsFromDB = requests.post(url=url, data=json.dumps(
        values), headers=headers).json()
    return thingsFromDB


def creatDateArrayWithRange(range):
    # 输入range
    # 返回用此range生成的列表

    rangeDays = (range['end'] - range['start']).days

    rangeArray = [{'CreatDate': range['start']}, ]
    i = 1
    while i <= rangeDays:
        rangeArray.append({'CreatDate': range['start']+timedelta(days=i)})
        i = i+1
    return rangeArray


def compareTowArray(emptyRangeArray, ThingsArrayFromDB):

    ArrayFromDBCopy = ThingsArrayFromDB
    emptyArrayCopy = emptyRangeArray
    # 初始化DB来的数据
    for index, things in enumerate(ThingsArrayFromDB):
        ArrayFromDBCopy[index]['CreatDate'] = date.fromisoformat(
            things['CreatDate'][0:10])

    # 二分查找法
    def binary_search(list, item):
        low = 0
        hight = len(list)-1
        while low <= hight:
            mid = int((low + hight)/2)
            guess = list[mid]['CreatDate']
            if(guess == item):
                return mid
            if(guess > item):
                hight = mid - 1
            else:
                low = mid+1
        return -1

    # 遍历空日期数组，与数据库的数组做比较，并找出差异
    for index, things in enumerate(emptyRangeArray):
        isExist = binary_search(ArrayFromDBCopy, things['CreatDate'])
        if(isExist != -1):
            emptyArrayCopy[index]['status'] = True
            emptyArrayCopy[index]['things'] = ArrayFromDBCopy[isExist]['ThreeThings']
        else:
            emptyArrayCopy[index]['status'] = False
    return emptyArrayCopy


def initDateArray(rangeArray):
    rangeArrayCopy = rangeArray
    for index, things in enumerate(rangeArray):
        rangeArrayCopy[index]['CreatDate'] = date.isoformat(
            things['CreatDate'])
    return rangeArrayCopy


def thingsArrayInCalendar(Onedate, mode):
    # 提供一个日期和mode（周还是月）
    # 返回所提供时长内每日的结果，如当日没有记录记为false
    range = getDateRange(Onedate, mode)
    ThingsArrayFromDB = getThingsFromDB(range, userID)
    emptyRangeArray = creatDateArrayWithRange(range)
    DifferenceOfArray = compareTowArray(emptyRangeArray, ThingsArrayFromDB)
    thingsInCalendar = initDateArray(DifferenceOfArray)
    # print(json.dumps(thingsInCalendar))
    return thingsInCalendar


# 主函数入口
thingsArrayInCalendar('2022-06-05', 'week')
