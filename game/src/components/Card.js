import React, {Component} from "react";
import characters from "./characters/character-index";
import ReactCardFlip from "react-card-flip";
// eslint-disable-next-line no-unused-vars
import cardStyle from "../resources/styles/card.css";
import digitalLogo from "../resources/images/DigitalLogo.png";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.parent = this.props.parent;
    }

    handleClick(e) {
        e.preventDefault();
        this.parent.flipMe(this);
    }

    findCharacter(){
        switch(this.props.character) {
            case "Apu":
                return <characters.Apu/>;
            case "Bart":
                return <characters.Bart/>;
            case "Homer":
                return <characters.Homer/>;
            case "Itchy":
                return <characters.Itchy/>;
            case "Jeff":
                return <characters.Jeff/>;
            case "Krusty":
                return <characters.Krusty/>;
            case "Lisa":
                return <characters.Lisa/>;
            case "Maggie":
                return <characters.Maggie/>;
            case "Marge":
                return <characters.Marge/>;
            case "MrBurns":
                return <characters.MrBurns/>;
            case "Ned":
                return <characters.Ned/>;
            case "Ralph":
                return <characters.Ralph/>;
            case "Smithers":
                return <characters.Smithers/>;
            default:
                return <characters.MrBurns/>;
        }
    }

    render() {
        return (
            <div className="allCards">
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                    <div id="clickable" onClick={this.handleClick}>
                        <img className="digitalLogo" src={digitalLogo} alt="digital products logo" />
                    </div>
                    <div index={this.props.index} id="clickable" className="characterFace" onClick={this.handleClick}>
                        <div className="paddingTop">
                            {this.findCharacter()}
                        </div>
                    </div>
                </ReactCardFlip>
            </div>
        );
    }

}

export default Card;