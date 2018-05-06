import React from 'react';

import { connect } from 'react-redux';

import moment from 'moment';

import DayNames from '../../components/dayNames'
import Week from '../../components/week';

moment.updateLocale('ru', {
    months : [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
        "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]
});

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: moment(),
            selected: moment().startOf('day')
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    previous() {
        const {
            month,
        } = this.state;

        this.setState({
            month: month.subtract(1, 'month')
        });
    }

    next() {
        const {
            month
        } = this.state;

        this.setState({
            month: month.add(1,'month')
        });
    }

    select(day) {
        this.setState({
            selected: day.date,
            month: day.date.clone()
        });
    }

    renderWeeks() {
        let weeks = [];
        let done = false;
        let date = this.state.month.clone().startOf("month").add("w" -1).day("Monday");
        let count = 0;
        let monthIndex = date.month();

        const {
            selected,
            month,
        } = this.state;

        while (!done) {
            weeks.push(
                <Week key={date}
                      date={date.clone()}
                      month={month}
                      select={(day)=>this.select(day)}
                      selected={selected}
                      state={this.props.state}
                />
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    };

    renderMonthLabel() {
        const {
            month,
        } = this.state;

        return <span className="month-label">{month.format("MMMM YYYY")}</span>;
    }

    render() {
        return (
            <section className="calendar">
                <header className="header">
                    <div className={'row month-display'}>
                        <i className="arrow arrow-left" onClick={this.previous}>&lt;</i>
                        {this.renderMonthLabel()}
                        <i className="arrow arrow-right" onClick={this.next}>&gt;</i>
                    </div>
                    <DayNames />
                </header>
                {this.renderWeeks()}
            </section>
        );
    }
}

export default connect(state => ({
        state: state
    }),
    dispatch => ({}))(Calendar)