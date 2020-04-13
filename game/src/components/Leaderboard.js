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
        const { data } = await axios.get('http://localhost:5000/scores', this.config);
        this.setState({leaders: data.topScores});
        this.state.worst = this.state.leaders[4];
    };

    sleep(ms, currentObject) {
        return new Promise(resolve => setTimeout(resolve, ms, currentObject));
    }

    render() {
        return (
            <div id="leaderboard">
                <ul>
                    {
                        this.state.leaders.map((item, key) => {
                            return <Player key={item.initials+item.clicks} clicks={item.clicks} initials={item.initials}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Leaderboard;