import React from "react";

import { connect } from 'react-redux';

class DayNames extends React.Component {
    render() {
        return (
            <div className={'row day-names'}>
                <span className="day">Понедельник</span>
                <span className="day">Вторник</span>
                <span className="day">Среда</span>
                <span className="day">Четверг</span>
                <span className="day">Пятницa</span>
                <span className="day">Суббота</span>
                <span className="day">Воскресенье</span>
            </div>
        );
    }
}

export default connect()(DayNames)