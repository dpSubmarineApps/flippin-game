import React, {Component} from "react";
import Player from "./Player";
import axios from 'axios';
import {fetchLeaders} from "../actions/fetch-leaders";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        // this.leaders = [{clicks: 7, initials: "abc"}, {clicks: 200, initials: "zyx"}];
        // this.leaders = [];
        this.state = { leaders: [], worst: {} };
        this.config = {
            headers: {'Content-Type': 'application/json'}
        };
        this.getLeaders();
    }

    getLeaders = async () => {
        const { data } = await axios.get('http://localhost:5000/scores', this.config);
        this.setState({leaders: data.topScores});
        // this.render();
        console.log(this.state.leaders)

        this.state.worst = this.state.leaders[4];
    };
    // componentDidMount() {
    //     this.getLeaders();
    // }

    sleep(ms, currentObject) {
        return new Promise(resolve => setTimeout(resolve, ms, currentObject));
    }

    render() {
        return (
            <div id="leaderboard">
                <ul>
                    {console.log("rendering")}
                    {
                        this.state.leaders.map((item, key) => {
                            console.log(item.initials)
                            return <Player clicks={item.clicks} initials={item.initials}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Leaderboard;