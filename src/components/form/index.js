import React from "react";
import {connect} from "react-redux";
import addRec  from '../../actions/recAction'
import delRec from '../../actions/recDelete';

class DescForm extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            eventName: '',
            eventDate: '',
            eventMembers: '',
            eventDesc: '',
        };
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventDate = this.onChangeEventDate.bind(this);
        this.onChangeEventMembers = this.onChangeEventMembers.bind(this);
        this.onChangeEventDesc = this.onChangeEventDesc.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        const {state} = this.props;
        const returnObj = JSON.parse(localStorage.getItem(this.props.dayKey));

        (state.length && this.setState({eventName: state.eventName})) ||
        (returnObj && this.setState({eventName: returnObj.eventName}));

        (state.length && this.setState({eventDate: state.eventDate})) ||
        (returnObj && this.setState({eventDate: returnObj.eventDate}));

        (state.length && this.setState({eventMembers: state.eventMembers})) ||
        (returnObj && this.setState({eventMembers: returnObj.eventMembers}));

        (state.length && this.setState({eventDesc: state.eventDesc})) ||
        (returnObj && this.setState({eventDesc: returnObj.eventDesc}));

    }
    onChangeEventName(e) {
        let val = e.target.value;
        this.setState({
            eventName: val,
        });
    }
    onChangeEventDate(e) {
        let val = e.target.value;
        this.setState({
            eventDate: val,
        });
    }
    onChangeEventMembers(e) {
        let val = e.target.value;
        this.setState({
            eventMembers: val,
        });
    }
    onChangeEventDesc(e) {
        let val = e.target.value;
        this.setState({
            eventDesc: val,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        localStorage.setItem(this.props.dayKey, JSON.stringify({
                                                        eventName: this.state.eventName,
                                                        eventDate: this.state.eventDate,
                                                        eventMembers: this.state.eventMembers,
                                                        eventDesc: this.state.eventDesc
                                                    }));
        this.props.close();

    }
    deleteEvent () {

        const {dispatch} = this.props;



        (() => dispatch(delRec(this.props.dayKey)))();



        localStorage.removeItem(this.props.dayKey);
        this.props.close();

    }

    componentWillReceiveProps (nextProps) {

    }

    render() {
        const {dispatch} = this.props;
        return (
            <div className="form-wrap">
                <div onClick={this.props.close} className="form_close">x</div>
                <form onSubmit={this.handleSubmit}>
                    <input className="form-input" type="text" placeholder="Событие" value={this.state.eventName} onChange={this.onChangeEventName}/>
                    <input className="form-input" type="text" placeholder="День, Месяц, Год" value={this.state.eventDate} onChange={this.onChangeEventDate}/>
                    <input className="form-input" type="text" placeholder="Участники" value={this.state.eventMembers} onChange={this.onChangeEventMembers}/>
                    <textarea className="form-textarea" placeholder="Описание" value={this.state.eventDesc} onChange={this.onChangeEventDesc}/>
                    <div className="form-buttons">
                        <button className="form-button" onClick={
                            () => dispatch(addRec(this.props.dayKey,
                                {
                                    eventName: this.state.eventName,
                                    eventDate: this.state.eventDate,
                                    eventMembers: this.state.eventMembers,
                                    eventDesc: this.state.eventDesc
                                })
                            )
                        }
                        >
                            Готово
                        </button>
                        {
                            this.state.eventName === ''
                            && this.state.eventDate === ''
                            && this.state.eventMembers === ''
                            && this.state.eventDesc === ''
                                ? ''
                                : <button className="form-button" onClick={this.deleteEvent}>Удалить</button>
                        }

                    </div>
                </form>

            </div>

        );
    }
}

export default connect()(DescForm)