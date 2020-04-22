import React, {Component} from "react";
import Player from "./Player";
import axios from 'axios';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = { leaders: [], worst: {} };
        this.config = {
            headers: {'Content-Type': 'application/json'}
        };
        this.getLeaders();
    }

    getLeaders = async () => {
        const { data } = await axios.get('/scores', this.config);
        this.setState({leaders: data.topScores});
        this.state.worst = this.state.leaders[4];
    };

    render() {
        return (
            <div id="leaderboard">
                <ul>
                    {
                        this.state.leaders.map((item, key) => {
                            return <Player key={key+item.initials+item.clicks} clicks={item.clicks} initials={item.initials}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Leaderboard;