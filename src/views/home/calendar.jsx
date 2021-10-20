import React from 'react';
import './calendar.less'
import { Select } from 'antd';
import CalendarJs from './calendar.js';
const { Option } = Select;
// console.log(CalendarJs)
// console.log(CalendarJs.getCalendarData(2021, 10))
const years = new Array(81).fill(0).map((y, index) => 1970 + index)
// console.log(years)
const months = new Array(12).fill(0).map((m, index) => 1 + index)
// console.log(months)
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 2021,
            month: 10,
            currentCalendarDate: []
        }
    }
    componentDidMount() {
        this.getCalendarData()
    }
    getCalendarData() {
        this.setState((state) => {
            return {
                currentCalendarDate: CalendarJs.getCalendarData(state.year, state.month),
            }
        })
    }
    changeYear(year) {
        console.log(`selected ${year}`);
        this.setState((state) => {
            return {
                year: year,
                // currentCalendarDate: CalendarJs.getCalendarData(year, state.month),
            }
        })
    }
    changeMonth(month) {
        console.log(`selected ${month}`);
        this.setState((state) => {
            return {
                month: month,
                currentCalendarDate: CalendarJs.getCalendarData(state.year, month),
            }
        })
    }
    render() {
        const { year, month, currentCalendarDate } = this.state
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <Select value={year} style={{ width: 100 }} onChange={this.changeYear}>
                        {years.map(year => <Option value={year} key={year}>{year}年</Option>)}
                    </Select>
                    <Select value={month} style={{ width: 80 }} onChange={this.changeMonth}>
                        {months.map(month => <Option value={month} key={month}>{month}月</Option>)}
                    </Select>
                </div>
                <div className="calendar-table">
                    <div className="calendar-table-header">
                        <div className="header-cell">一</div>
                        <div className="header-cell">二</div>
                        <div className="header-cell">三</div>
                        <div className="header-cell">四</div>
                        <div className="header-cell">五</div>
                        <div className="header-cell">六</div>
                        <div className="header-cell">日</div>
                    </div>
                    <div className="calendar-table-body">
                        {currentCalendarDate.map((d, index) => <div className="calendar-table-row" key={index}>
                            {d.map(r => <div className="row-cell" key={r}>{r}</div>)}
                        </div>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default Calendar