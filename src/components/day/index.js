import React from "react";
import DescForm from '../../components/form';
import DayEvent from '../../components/dayEvent';

import { connect } from 'react-redux';


class Day extends React.Component {


    constructor (props) {
        super(props);
        this.state = {
            open: false
        };

        this.open = this.open.bind(this);
    }

    open () {
        this.setState({open: !this.state.open});
    }


    render() {
        const {
            day,
            day: {
                date,
                isCurrentMonth,
                isToday,
                number
            },
            select,
            selected
        } = this.props;
        return (
            <div
                key={date.toString()}
                className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")}
            >
            <div className="day_content"
                onClick={()=>{
                    select(day);
                    this.open()
                }
                }
            >
                <div className={'day_number'}>{number}</div>
                    <DayEvent dayKey={date.toString()}
                              state={(this.props.state &&
                                  this.props.state.recordReducer &&
                                  this.props.state.recordReducer[date.toString()]) ||
                              []}
                    />

            </div>
                {
                    date.isSame(selected) && this.state.open
                        ? <DescForm close={this.open}
                                    dayKey={date.toString()}
                                    state={(this.props.state &&
                                            this.props.state.recordReducer &&
                                            this.props.state.recordReducer[date.toString()]) ||
                                                []
                                    }
                        />
                        : <div />
                }
            </div>
        );
    }
}

export default connect()(Day)