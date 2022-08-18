import {html, LitElement} from "lit";

import apple from "../../img/apple.jpg"
import bomb from "../../img/bomb.jpg";
import coin from "../../img/coin.jpg";
import diamond from "../../img/diamond.jpg";
import goblet from "../../img/goblet.jpg";
import heart from "../../img/heart.jpg";
import hourglass from "../../img/hourglass.jpg";
import key from "../../img/key.jpg";
import meat from "../../img/meat.jpg";
import potion from "../../img/potion.jpg";
import scroll from "../../img/scroll.jpg";
import shield from "../../img/shield.jpg";
import skull from "../../img/skull.jpg";
import star from "../../img/star.jpg";
import sword from "../../img/sword.jpg";
import questionMark from "../../img/questionmark.jpg";

export class MatchCard extends LitElement {

    static IMAGES = [
        apple, bomb, coin, diamond, goblet,
        heart, hourglass, key, meat, potion,
        scroll, shield, skull, star, sword];

    constructor(id, gameField) {
        super();
        this.gameField = gameField;
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
            }, 350);
            return false;
        }
    }

    render() {
        return html`
            <div>
                <img src="${this.isOpened() ? this.image : questionMark}" alt="match-card"/>
            </div>`;
    }
}

window.customElements.define('match-card', MatchCard);