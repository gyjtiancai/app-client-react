import React from 'react';
import { connect } from 'react-redux'
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
        this.changeYear = this.changeYear.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
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
        this.setState((state) => {
            return {
                year: year,
            }
        })
        this.getCalendarData()
    }
    changeMonth(month) {
        this.setState((state) => {
            return {
                month: month,
            }
        })
        this.getCalendarData()
    }
    render() {
        const { currentLanguage } = this.props
        const { year, month, currentCalendarDate } = this.state
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <Select value={year} style={{ width: 100 }} onChange={this.changeYear}>
                        {years.map(y => <Option value={y} key={y}>{y}{currentLanguage === 'CN' ? '年' : ''}</Option>)}
                    </Select>
                    <Select value={month} style={{ width: 80 }} onChange={this.changeMonth}>
                        {months.map(m => <Option value={m} key={m}>{m}{currentLanguage === 'CN' ? '月' : ''}</Option>)}
                    </Select>
                </div>
                <div className="calendar-table">
                    <div className="calendar-table-header">
                        <div className="header-cell">{currentLanguage === 'CN' ? '一' : 'Mon'}</div>
                        <div className="header-cell">{currentLanguage === 'CN' ? '二' : 'Tue'}</div>
                        <div className="header-cell">{currentLanguage === 'CN' ? '三' : 'Wed'}</div>
                        <div className="header-cell">{currentLanguage === 'CN' ? '四' : 'Thu'}</div>
                        <div className="header-cell">{currentLanguage === 'CN' ? '五' : 'Fri'}</div>
                        <div className="header-cell">{currentLanguage === 'CN' ? '六' : 'Sat'}</div>
                        <div className="header-cell">{currentLanguage === 'CN' ? '日' : 'Sun'}</div>
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
function mapStateToProps(state) {
    return {
        currentLanguage: state.common.currentLanguage
    }
}

export default connect(
    mapStateToProps,
)(Calendar)
// export default Calendar