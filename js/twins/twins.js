import {css, html, LitElement} from 'lit';
import {GameField} from "./game-field";

class CardTwins extends LitElement {

    constructor() {
        super();
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
    `;

    selectCard(event) {
        const id = event.target.getAttribute('id');
        if (this.selected.length < 2) this.selected.push(id);
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="game-box">
                <h1>Card Twins</h1>
                <div class="dashboard">
                    <p>Pairs remains: 10</p>
                    <p>Timer: <span class="timer">1:59</span></p>
                </div>
                <game-field rows="4" columns="6"></game-field>
            </div>
        `;
    }
}

window.customElements.define('card-twins', CardTwins);
window.customElements.define('game-field', GameField);