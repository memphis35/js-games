import {css, html, LitElement} from 'lit';

export class CardSettings extends LitElement {

    constructor(game) {
        super();
        this.game = game;
        this.rowsArray = [2, 4, 6];
        this.colsArray = [2, 3, 4, 5];
        this.rows = this.rowsArray[0];
        this.columns = this.colsArray[0];
        this.hidden = false;
    }

    static styles = css`
        .hidden {
            visibility: none;
        }
        
        .settings {
            display: flex;
            align-items: center;
        }
        
        label {
            text-align: center;
        }
        
        .select {
            display: flex;
            flex-direction: column;
            width: 100px;
            margin: 10px 20px;
        }
        
        select {
            border:none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            -ms-appearance: none;
            
            display: block;
            text-align: center;
            font-size: x-large;
        }
        
        button {
            unset: all;

            margin: 20px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
        }
    `;

    updateRows(event) {
        this.rows = Number.parseInt(event.target.value);
    }

    updateColumns(event) {
        this.columns = Number.parseInt(event.target.value);
    }

    startGame() {
        this.game.startGame();
    }

    hide() {
        this.hidden = true;
        this.requestUpdate();
    }

    unhide() {
        this.hidden = false;
        this.requestUpdate();
    }

    render() {
        return html`
            <div id="settings" class="settings ?hidden=${this.hidden}">
                <div class="select">
                    <label for="rows">ROWS</label>
                    <select id="rows" @change="${this.updateRows}">
                        ${this.rowsArray.map(row => html`
                            <option value="${row}" ?checked="${this.rows === row}">${row}</option>`)}
                    </select>
                </div>
                <div class="select">
                    <label for="cols">COLS</label>
                    <select id="cols" @change="${this.updateColumns}">
                        ${this.colsArray
                                .map(column => html`
                                    <option value="${column}" ?checked="${column === this.columns}">${column}
                                    </option>`)}
                    </select>
                </div>
                <button type="button" @click="${this.startGame}">START</button>
            </div>
        `
    }
}