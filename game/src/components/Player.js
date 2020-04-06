import React, {Component} from "react";
// import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {record} from "../actions/record";

class Player extends Component {
    constructor(props) {
        super(props);
        this.clicks = props.clicks;
    }

    onSubmit = e => {
        e.preventDefault();
        let initials = document.getElementById("inputInitials").value;
        record(this.clicks, initials);
    };

    render() {
        return (
            <div>
                <form id="playerForm" className="playerForm" onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input id="inputInitials" placeholder="Initials" name="initials" required/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Join the Hall of Fame"/>
                </form>
            </div>
        )
    }
}

Player.propTypes = {
    clicks: PropTypes.number.isRequired,
};

export default Player;