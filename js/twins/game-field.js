import {css, html, LitElement} from "lit";
import {MatchCard} from "./match-card";

export class GameField extends LitElement {

    constructor(game, dashboard, rows, cols) {
        super();
        this.game = game;
        this.dashboard = dashboard;
        this.rows = rows;
        this.cols = cols;
        this.quantity = rows * cols;
        const totalCards = this.shuffle([...Array(this.quantity).keys()].map(id => new MatchCard(id)));
        this.cardsByRow = [...Array(this.rows).keys()].map(() => totalCards.splice(0, this.cols));
        this.cardHolder = new CardHolder();
    }

    static styles = css`
        .row {
            display: flex;
        }
        
        match-card {
            margin: 10px;
        }
    `;

    shuffle(generated) {
        const original = [...generated];
        const shuffled = [];
        while (original.length > 0) {
            const randomId = Math.floor(Math.random() * original.length);
            shuffled.push(original[randomId]);
            original.splice(randomId, 1);
        }
        return shuffled;
    }

    cardSelected(event) {
        const card = event.target;
        if (card instanceof MatchCard) {
            if (card.isOpened()) return;
            const matched = this.cardHolder.pushCard(card);
            if (matched) {
                this.dashboard.decreaseRemaining();
            }
        }
        if (this.dashboard.allMatched()) {
            this.game.stopGame();
        }
    }

    render() {
        return html`
                ${this.cardsByRow.map(row => html`<div class="row" @click="${this.cardSelected}">${row}</div>`)}
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
