from datetime import date
from datetime import timedelta


def initDate(Onedate):
    NewDate = date.fromisoformat(Onedate)
    return NewDate


def getDateRange(Onedate, mode):
    def getWeekRange(Onedate):
        # 输入日期，返回此日期所在周的开始与结束
        # 默认 周日为开始，周六为结束，
        # TODO:后续改为 ISO 标准日历
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
        Range = getWeekRange(Onedate)
    elif (mode == 'month'):
        Range = getMonthRange()
    else:
        # 如使用了其他mode，返回-1 代表错误
        Range = -1
    return Range


# 主函数入口
def DifferenceOfRange(Onedate, mode):
    # 提供一个日期和模式（周还是月）
    # 返回所提供时长内每日的结果，如当日没有记录记为空
    range = getDateRange(Onedate, mode)
    ThingsArrayFromDB = getThingsFromDB(range)
    emptyRangeArray = creatDateArrayWithRange(range)
    DifferenceOfArray = CompareTwoArray(emptyRangeArray, ThingsArrayFromDB)
    return DifferenceOfArray


initDate()
DifferenceOfRange()
initArray()
