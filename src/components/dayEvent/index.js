import React from "react";

class DayEvent extends React.Component {
    render(){
        const returnObj = JSON.parse(localStorage.getItem(this.props.dayKey));
        const {state} = this.props;
        return <div className="day_event">
            <div>{(state.length && state.eventName) || (returnObj && returnObj.eventName) || ''}</div>
            <div>{(state.length && state.eventDate) || (returnObj && returnObj.eventDate) || ''}</div>
            <div>{(state.length && state.eventMembers) || (returnObj && returnObj.eventMembers) || ''}</div>
            <div>{(state.length && state.eventDesc) || (returnObj && returnObj.eventDesc) || ''}</div>
        </div>
    }
}

export default (DayEvent)