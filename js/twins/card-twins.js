import {css, html, LitElement} from 'lit';
import {GameField} from "./game-field";
import {CardDashboard} from "./card-dashboard";
import {CardSettings} from "./card-settings";

class CardTwins extends LitElement {

    constructor() {
        super();
        this.gameStarted = false;
        this.settings = new CardSettings();
        this.dashboard = null;
        this.gameField = null;
    }

    static styles = css`
        .game-box {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		
		.field {
		    display: flex;
		}
		
		img {
		    padding: 10px;
		}
		
		button {
		    unset: all;
		}
    `;

    startGame() {
        const totalCards = this.settings.rows * this.settings.columns;
        this.dashboard = new CardDashboard(totalCards / 2);
        this.gameField = new GameField(this.dashboard, this.settings.rows, this.settings.columns);
        this.dashboard.startTimer();
        this.gameStarted = true;
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="game-box">
                <h1>Card Twins</h1>
                ${this.settings}
                <button type="button" ?hidden="${this.gameStarted}" @click="${this.startGame}">START GAME</button>
                ${this.dashboard}
                ${this.gameField}
            </div>
        `;
    }
}

window.customElements.define('card-twins', CardTwins);
window.customElements.define('game-field', GameField);
window.customElements.define('card-dashboard', CardDashboard);
window.customElements.define('card-settings', CardSettings);