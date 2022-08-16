import {css, html, LitElement} from "lit";
import {MatchCard} from "./match-card";

export class GameField extends LitElement {

    constructor() {
        super();
        this.quantity = 12;
        this.cards = [...Array(this.quantity).keys()].map(id => new MatchCard(id));
        this.cardHolder = new CardHolder();
    }

    static properties = {
        rows: {type: String},
        columns: {type: String}
    }

    static styles = css`
        .field {
            display: flex;
            flex-wrap: wrap;
        }
        
        match-card {
            margin: 10px;
        }
    `;

    cardSelected(event) {
        const card = event.target;
        if (card instanceof MatchCard) {
            if (card.isOpened()) return;
            const matched = this.cardHolder.pushCard(card);
        }
    }

    render() {
        return html`
            <div class="field" @click="${this.cardSelected}">
                ${this.cards}
            </div>
        `
    }

}

class CardHolder {
    constructor() {
        this._firstCard = null;
        this._secondCard = null;
    }

    pushCard(card) {
        card.select();
        if (!this._firstCard) {
            this._firstCard = card;
            return false;
        } else {
            this._secondCard = card;
            const matched = this._checkMatching();
            this._reset();
            return matched;
        }
    }

    _checkMatching() {
        return this._firstCard.matchCards(this._secondCard);
    }

    _reset() {
        this._firstCard = null;
        this._secondCard = null;
    }
}
