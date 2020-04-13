import React, {Component} from "react";

class Player extends Component {
    constructor(props) {
        super(props);
        this.initials = props.initials;
        this.clicks = props.clicks;
    }

    render() {
        return (
            <li id={this.initials+this.clicks} className="player">
                {this.clicks} **** {this.initials}
            </li>
        )
    }
}

export default Player;