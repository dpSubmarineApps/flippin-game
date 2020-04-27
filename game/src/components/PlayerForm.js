import React, {Component} from "react";
import PropTypes from 'prop-types';
import {record} from "../actions/record";

class PlayerForm extends Component {
    constructor(props) {
        super(props);
        this.clicks = props.clicks;
    }

    sleep(ms, currentObject) {
        return new Promise(resolve => setTimeout(resolve, ms, currentObject));
    }

    onSubmit = e => {
        e.preventDefault();
        let initials = document.getElementById("inputInitials").value;

        record(this.clicks, initials).then(value => {
            if(value){
                document.getElementById("inputInitials").setCustomValidity(value.data);
                document.getElementById("inputInitials").reportValidity();
            } else {
                document.getElementById("playerForm").style.display="none";
            }
        });

        let gameboard = this.props.parent;
        this.sleep(1000, this).then(() => {
            gameboard.triggerRefs();
        })
    };

    onKeyUp = e => {
        e.preventDefault();
        document.getElementById("inputInitials").setCustomValidity("");
    }

    render() {
        return (
            <div>
                <form id="playerForm" className="playerForm" onKeyUp={e => this.onKeyUp(e)} onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input id="inputInitials" placeholder="Initials" name="initials" required />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Join the Hall of Fame"/>
                </form>
            </div>
        )
    }
}

PlayerForm.propTypes = {
    clicks: PropTypes.number.isRequired,
};

export default PlayerForm;