import React, {Component} from "react";
import Card from "./Card";
import PlayerForm from "./PlayerForm";
import Leaderboard from "./Leaderboard";
import song from "../resources/sounds/simpsonsThemeSong.mp3";

class Gameboard extends Component {
    constructor(props) {
        super(props);
        this.characters = ["Apu", "Bart", "Homer", "Jeff", "Itchy", "Krusty", "Lisa", "Maggie", "Marge", "MrBurns", "Ned", "Ralph", "Smithers"];
        this.topEightCharacters = this.shuffleArray(this.characters);
        this.randomizedCharacters = this.shuffleArray([].concat(this.topEightCharacters.slice(0, 8), this.topEightCharacters.slice(0, 8)));
        this.queue = [];
        this.matched = [];
        this.clickCount = 0;
        this.player = [];
        this.topFive = React.createRef();
        this.leaderboard = <Leaderboard ref={this.topFive}/>;
        this.worst = 100000000000;
    }

    generatePlayer(clickCount) {
        this.setState({
            player: this.player.push(<PlayerForm key={clickCount} parent={this} clicks={clickCount} initials={""}/>)
        })
    }

    flipMe(currentCard) {
        this.clickCount++;

        if (!this.matched.includes(currentCard.props.character)) {
            this.queue.push(currentCard);
            if (this.queue.length === 1) {
                currentCard.setState(prevState => ({isFlipped: !prevState.isFlipped}));
            }
            if (this.queue.length === 2) {
                if (this.queue[0].props.character === currentCard.props.character && this.queue[0].props.id !== currentCard.props.id) {
                    currentCard.setState(prevState => ({isFlipped: !prevState.isFlipped}));
                    currentCard.handleClick = null;
                    this.queue[0].handleClick = null;
                    this.queue = [];
                    this.matched.push(currentCard.props.character);
                    if (this.matched.length === 8) {
                        document.getElementById('themeSong').play();
                        document.getElementById('clickCountTotal').innerText = "WINNER!!! Your click count was: " + this.clickCount + "!";
                        let leaderboard = document.getElementById('leaderboard');
                        leaderboard.style.display = "block";
                        let topFive = leaderboard.children[0].children;
                        if(topFive.length > 4 ){
                            this.worst = (topFive[topFive.length-1].textContent.split("****")[0]) * 1;
                        }
                        if(this.clickCount < this.worst){
                            this.generatePlayer(this.clickCount);
                        }
                        this.sleep(1100, this).then(() => {
                            document.getElementById('status').style.display = "block";
                        });
                    }
                } else {
                    currentCard.setState(prevState => ({isFlipped: !prevState.isFlipped}));
                    this.sleep(1000, this).then(() => {
                        currentCard.setState(prevState => ({isFlipped: !prevState.isFlipped}));
                        this.queue[0].setState(prevState => ({isFlipped: !prevState.isFlipped}));
                        this.queue = [];
                    });
                }
            }
        }
    }

    testingRefs() {
        this.topFive.current.getLeaders();
    }

    sleep(ms, currentObject) {
        return new Promise(resolve => setTimeout(resolve, ms, currentObject));
    }

    shuffleArray(array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {
        return (
            <div>
                <div id="gameboard">
                    <div id="status">
                        <div id="gameEndContent">
                            <div className="center">
                                <div id="clickCountTotal"></div>
                                <div>{this.clickCount < this.worst ?
                                    <div id="player">{this.player}</div> : <div></div>
                                }</div>
                                <div>
                                    {this.leaderboard}
                                </div>
                            </div>
                        </div>
                        <audio id="themeSong">
                            <source src={song} type="audio/mp3"></source>
                        </audio>
                    </div>
                    {this.randomizedCharacters.map((character, id) => {
                        return <Card key={id} id={id} parent={this} character={character}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Gameboard;