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
            font-size: x-large;
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
                <div class="digit-counter">
                    <p>ROWS</p>
                    <button type="button" class="action-btn"> +</button>
                    <div class="digit"><p>2</p></div>
                    <button type="button" class="action-btn"> -</button>
                </div>
                <div class="start-btn-wrap">
                    <button type="button" class="start-btn" @click="${this.startGame}">GO!</button>
                </div>
                <div class="digit-counter">
                    <p>COLUMNS</p>
                    <button type="button" class="action-btn"> +</button>
                    <div class="digit"><p>2</p></div>
                    <button type="button" class="action-btn"> -</button>
                </div>
            </div>
        `
    }
}