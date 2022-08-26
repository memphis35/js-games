import {LitElement, html, css} from 'lit';

export class GuessSettings extends LitElement {
	constructor(game, dashboard) {
		super();
		this.game = game;
		this.dashboard = dashboard;
		this.maxElements = 5;
		this.winningElements = 1;
	}

	static styles = css`
		* {
			color: gray;
			text-align: center;
		}

		h2, .settings, p, .counter {
			// border: 1px solid blue;
		}

		.settings {
			width: 550px;
			display: grid;
			grid-template-columns: 33% 33% 33%;
		}

		p {
			align-self: center;
		}

		.counter {
			display: flex;
			justify-content: center;
		}

		.digit {
			padding: 0 20px;
			min-width: 50px;
			font-size: xx-large;
			display: flex;
			justify-content: center;
			align-items: center;	
		}

		button {
			margin: 0;
			padding: 10px;
			width: 100px;
			border: 2px solid gray;
			border-radius: 10px;
			justify-self: center;
			transition: all 0.1s;
		}

		svg {
			fill: lightgray;
			transition: all 0.2s;
		}

		button:active {
			transform: scale(0.95, 0.95);
		}

		svg:active {
			transform: scale(0.8, 0.8);
		}
	`;

	increaseElements() {
		if (this.maxElements < 20) this.maxElements += 1;
		this.shadowRoot.querySelector('#total-elements').textContent = this.maxElements;
		this.game.requestUpdate();
	}

	decreaseElements() {
		if (this.maxElements > 2) this.maxElements -= 1;
		if (this.maxElements <= this.winningElements) {
			this.decreaseWinnings();
		}
		this.shadowRoot.querySelector('#total-elements').textContent = this.maxElements;
		this.game.requestUpdate();
	}

	increaseWinnings() {
		if (this.winningElements < 10 & this.winningElements < this.maxElements - 1) {
			this.winningElements += 1;
		}
		this.shadowRoot.querySelector('#winning-elements').textContent = this.winningElements;
		this.game.requestUpdate();
	}

	decreaseWinnings() {
		if (this.winningElements > 1 ) {
			this.winningElements -= 1;
		}
		this.shadowRoot.querySelector('#winning-elements').textContent = this.winningElements;
		this.game.requestUpdate();
	}

	generateElementsToWin() {
		const result = [];
		const numbers = [];
		for (let i = 1; i <= this.maxElements; i++) {
			numbers.push(i);
		}
		for (let j = 0; j < this.winningElements; j++) {
			const rand = this._getRandomInt(numbers.length);
			result.push(numbers[rand]);
			numbers.splice(rand, 1);
		}
		return result;
	}

	getMaxElements() {
		return this.maxElements;
	}

	reset() {
		this.maxElements = 5;
		this.winningElements = 1;
		this.shadowRoot.querySelector('#total-elements').textContent = this.maxElements;
		this.shadowRoot.querySelector('#winning-elements').textContent = this.winningElements;
		this.game.requestUpdate();
		this.dashboard.reset();
		this.requestUpdate();
	}

	render() {
		return html`
		<div class="settings">
			<div class="counter">
				<svg height="50" width="25" @click="${this.decreaseElements}">
  					<polygon points="25,0 25,50 0,25"/>
	  			</svg>
				<div id="total-elements" class="digit">${this.maxElements}</div>
				<svg height="50" width="25" @click="${this.increaseElements}">
	  				<polygon points="0,0 25,25 0,50"/>
	  			</svg>
			</div>
			<div class="counter">
				<svg height="50" width="25" @click="${this.decreaseWinnings}">
  					<polygon points="25,0 25,50 0,25"/>
	  			</svg>
				<div id="winning-elements" class="digit">${this.winningElements}</div>
				<svg height="50" width="25" @click="${this.increaseWinnings}">
	  				<polygon points="0,0 25,25 0,50"/>
	  			</svg>
			</div>
			<button type="button" @click="${this.reset}">RESET</button>
			<p>total elements</p>
			<p>winning numbers</p>
		</div>`;
	}


	_getRandomInt(max) {
	  return Math.floor(Math.random() * max);
	}
}

window.customElements.define('guess-settings', GuessSettings);