class Calendar {
    constructor() {
        console.log('Calendar is load successfully !')
    }
    // init() {
    //     //获取年
    //     const year = new Date().getFullYear()
    //     //获取月
    //     const month = new Date().getMonth() + 1
    //     //获取天
    //     const day = new Date().getDate()
    //     //获取指定日期为周几
    //     const weekDay = new Date(2021, 9, 8).getDay()
    //     //获取指定月有多少天
    //     const days = new Date(2021, 10, 0).getDate()
    //     return [year, month, day, weekDay, days]
    // }
    //获取指定年月有多少天
    getMonthDays(year, month) {
        return new Date(year, month, 0).getDate()
    }
    //获取指定年月的第一天是星期几
    getWeekDayOfMonthFirstDay(year, month) {
        return new Date(year, month - 1, 1).getDay()
    }
    //获取指定年月的日历数据
    getCalendarData(year, month) {
        const days = this.getMonthDays(year, month)
        const weekDay = this.getWeekDayOfMonthFirstDay(year, month)
        const CalendarData = new Array(6).fill(0).map(v => [0, 0, 0, 0, 0, 0, 0])
        // console.log(CalendarData)
        const fillCount_row_1 = 7 - weekDay + 1
        // console.log(fillCount_row_1)
        const fillCount_row_2 = 7
        // console.log(fillCount_row_2)
        const fillCount_row_3 = 7
        // console.log(fillCount_row_3)
        const fillCount_row_4 = 7
        // console.log(fillCount_row_4)
        const fillCount_row_5 = days - fillCount_row_1 - 7 * 3 >= 7 ? 7 : days - fillCount_row_1 - 7 * 3
        // console.log(fillCount_row_5)
        const fillCount_row_6 = days - fillCount_row_1 - 7 * 4 > 0 ? days - fillCount_row_1 - 7 * 4 : 0
        // console.log(fillCount_row_6)
        let prevMonthDays = this.getMonthDays(year, month - 1)

        //填充上个月的最后几天
        for (let i = 7 - fillCount_row_1 - 1; i >= 0; i--) {
            CalendarData[0][i] = prevMonthDays
            prevMonthDays--
        }
        //填充本月所有天数
        let day = 1
        for (let i = 7 - fillCount_row_1; i < 7; i++) {
            CalendarData[0][i] = day
            day++
        }
        for (let i = 0; i < fillCount_row_2; i++) {
            CalendarData[1][i] = day
            day++
        }
        for (let i = 0; i < fillCount_row_3; i++) {
            CalendarData[2][i] = day
            day++
        }
        for (let i = 0; i < fillCount_row_4; i++) {
            CalendarData[3][i] = day
            day++
        }
        for (let i = 0; i < fillCount_row_5; i++) {
            CalendarData[4][i] = day
            day++
        }
        for (let i = 0; i < fillCount_row_6; i++) {
            CalendarData[5][i] = day
            day++
        }
        //填充下个月的前面几天
        let nextMonthDays = 1
        for (let i = 0; i < 7 - fillCount_row_5; i++) {
            // console.log(i)
            CalendarData[4][fillCount_row_5 + i] = nextMonthDays
            nextMonthDays++
        }
        for (let i = 0; i < 7 - fillCount_row_6; i++) {
            // console.log(i)
            CalendarData[5][fillCount_row_6 + i] = nextMonthDays
            nextMonthDays++
        }
        return CalendarData
    }
}
export default new Calendar()
