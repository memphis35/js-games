import {css, html, LitElement} from 'lit';
import {GameField} from "./game-field";
import {CardDashboard} from "./card-dashboard";
import {CardSettings} from "./card-settings";

class CardTwins extends LitElement {

    constructor() {
        super();
        this.gameStarted = false;
        this.settings = new CardSettings(this);
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
		
		button {
		    unset: all;
		}
    `;

    startGame() {
        const totalCards = this.settings.rows * this.settings.columns;
        this.settings.hide();
        this.dashboard = new CardDashboard(totalCards / 2);
        this.gameField = new GameField(this, this.dashboard, this.settings.rows, this.settings.columns);
        this.dashboard.startTimer();
        this.gameStarted = true;
        this.requestUpdate();
    }

    stopGame() {
        this.dashboard.stopTimer();
        this.settings.reveal();
    }

    render() {
        return html`
            <div class="game-box">
                ${this.settings}
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