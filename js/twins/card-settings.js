import {css, html, LitElement} from 'lit';

export class CardSettings extends LitElement {

    constructor(game) {
        super();
        this.game = game;
        this.rowsArray = new Counter([2, 4, 6, 8]);
        this.colsArray = new Counter([2, 3, 4]);
        this.rows = 2;
        this.columns = 2;
        this.hidden = false;
    }

    static styles = css`
        .hidden {
            visibility: none;
        }
        
        .settings {
            width: 450px;
            margin: 0 auto;
            display: flex;
            justify-content: space-evenly;
        }
        
        div, .digit-counter {
            width: 100px;
            text-align: center;
        }
        
        .digit-counter {
            display: flex;
            flex-direction: column;
        }
        
        .digit p {
            margin: 0;
            padding: 10px;
            font-size: xx-large;
        }
        
        .start-btn-wrap {
            padding-top: 50px;
            display: flex;
        }
        
        .start-btn, .action-btn {
            background-color: white;
            border: 2px solid gray;
            border-radius: 10px;
            transition: all 0.5s
        }
        
        .start-btn {
            width: 100px;
        }
        
        .action-btn {
            padding: 10px;
        }
        
        .start-btn:active, .action-btn:active {
            transform: scale(0.9, 0.9);
        }
        
    `;

    increaseRows() {
        this.rows = this.rowsArray.nextValue();
        this.shadowRoot.querySelector('#rows').textContent = this.rows;
    }

    decreaseRows() {
        this.rows = this.rowsArray.previousValue()
        this.shadowRoot.querySelector('#rows').textContent = this.rows;
    }

    increaseColumns() {
        this.columns = this.colsArray.nextValue();
        this.shadowRoot.querySelector('#cols').textContent = this.columns;
    }

    decreaseColumns() {
        this.columns = this.colsArray.previousValue();
        this.shadowRoot.querySelector('#cols').textContent = this.columns;
    }

    startGame() {
        this.game.startGame();
    }

    hide() {
        this.hidden = true;
        this.requestUpdate();
    }

    reveal() {
        this.hidden = false;
        this.requestUpdate();
    }

    render() {
        return html`
            <div id="settings" class="settings ?hidden=${this.hidden}">
                <div class="digit-counter">
                    <p>ROWS</p>
                    <button type="button" class="action-btn" @click="${this.increaseRows}"> + </button>
                    <div class="digit"><p id="rows">2</p></div>
                    <button type="button" class="action-btn" @click="${this.decreaseRows}"> - </button>
                </div>
                <div class="start-btn-wrap">
                    <button type="button" class="start-btn" @click="${this.startGame}">GO!</button>
                </div>
                <div class="digit-counter">
                    <p>COLUMNS</p>
                    <button type="button" class="action-btn" @click="${this.increaseColumns}"> + </button>
                    <div class="digit"><p id="cols">2</p></div>
                    <button type="button" class="action-btn" @click="${this.decreaseColumns}"> - </button>
                </div>
            </div>
        `
    }

}

class Counter {
    constructor(values) {
        this._values = values;
        this._limit = values.length - 1;
        this._pointer = 0;
    }

    nextValue() {
        const isOnLimit = (this._pointer === this._limit);
        if (!isOnLimit) this._pointer += 1;
        return this._values[this._pointer];
    }

    previousValue() {
        const isOnZero = (this._pointer === 0);
        if (!isOnZero) this._pointer -= 1;
        return this._values[this._pointer];
    }
}