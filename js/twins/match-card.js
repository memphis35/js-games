import {html, LitElement} from "lit";
import questionMark from "../../img/question-mark.jpg";
import coin from "../../img/coin.jpg";
import bomb from "../../img/bomb.jpg";
import diamond from "../../img/diamond.jpg";
import potion from "../../img/potion.jpg";

export class MatchCard extends LitElement {

    static IMAGES = [coin, bomb, diamond, potion];

    constructor(id, gameField) {
        super();
        this.gameField = gameField;
        this.cardId = `card-${id}`;
        this.image = MatchCard.IMAGES[id % 2 === 0 ? id / 2 : (id / 2) - 0.5];
        this.selected = false;
        this.matched = false;
    }

    static properties = {
        id: {type: String}
    }

    select() {
        this.selected = true;
        this.requestUpdate();
    }

    unselect() {
        if (!this.matched) this.selected = false;
        this.requestUpdate();
    }

    markMatched() {
        this.matched = true;
        this.requestUpdate();
    }

    isOpened() {
        return this.selected || this.matched;
    }

    matchCards(anotherCard) {
        if (this.image === anotherCard.image) {
            console.log('matched!!!')
            this.markMatched();
            anotherCard.markMatched();
            return true;
        } else {
            console.log('not matched!!!')
            setTimeout(() => {
                this.unselect();
                anotherCard.unselect();
            }, 500);
            return false;
        }
    }

    render() {
        return html`
            <div>
                <img src="${this.isOpened() ? this.image : questionMark}"
                     alt="match-card"/>
            </div>`;
    }
}

window.customElements.define('match-card', MatchCard);