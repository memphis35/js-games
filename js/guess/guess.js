import {LitElement, html, css} from 'lit';
import {DashBoard} from './dashboard.js';
import {GuessSettings} from './guess-settings.js';

export class LetMeGuess extends LitElement {
	constructor() {
		super();
		this.dashboard = new DashBoard();
		this.settings = new GuessSettings(this);
	}

	static styles = css`

		.gamebox {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.settings {
			display: flex;
			width: 800px;
			justify-content: center;
		}

		ul {
			margin: 40px;
			padding: 0;
			width: 620px;
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;
		}

		li {
			margin: 10px;
			padding: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid gray;
			border-radius: 10px;
			height: 100px;
			width: 100px;
			transition: all 0.5s;
		}

		li:hover {
			background-color: lightgray;
		}

		li:active {
			transform: scale(0.9, 0.9);
		}

		.number {
			cursor: default;
			display: block;
			color: white;
			font-size: xxx-large;
		}
	`;

	_getRandomInt(max) {
	  return Math.floor(Math.random() * max);
	}

	checkResult(event) {

		const result = Number.parseInt(event.target.textContent);
		const isWinnning = this.settings.generateElementsToWin()
		.some(i => i === result);
		if (isWinnning) {
			this.dashboard.addWin();
		} else {
			this.dashboard.addLoss();
		}
		this.requestUpdate();
	}

	changeCells(event) {
		const count = Number.parseInt(event.target.value);
		const elements = [];
		const limit = count < 20 ? count : 20;
		for (let i = 1; i <= limit; i++) {
			this._elements.push(i);
		}
		this.requestUpdate();
	}

	render() {
		const elements = [];
		for (let i = 1; i <= this.settings.getMaxElements(); i++) {
			elements.push(i);
		};
		this._numberToWin = this._getRandomInt(elements.length) + 1;
		return html`
		<div class="gamebox">
			<h1>"Let Me Guess?"</h1>
			${this.settings}
			${this.dashboard}
			<ul>
				${elements.map(e => html`<li @click="${this.checkResult}"><span class="number">${e}</span></li>`)}
			</ul>
		</div>
		`;
	}

}

window.customElements.define('let-me-guess', LetMeGuess);