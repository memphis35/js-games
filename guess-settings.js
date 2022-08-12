import {LitElement, html, css} from 'lit';

export class GuessSettings extends LitElement {
	constructor(game) {
		super();
		this.game = game;
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
			width: 400px;
			display: grid;
			grid-template-columns: 50% 50%;
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

		svg {
			fill: lightgray;
			transition: all 0.5s;
		}

		svg:hover {
			transform: scale(0.8, 0.8);
		}
	`;

	increaseElements() {
		if (this.maxElements < 20) this.maxElements += 1;
		this.shadowRoot.querySelector('#max-elements').textContent = this.maxElements;
		this.game.requestUpdate();
	}

	decreaseElements() {
		if (this.maxElements > 2) this.maxElements -= 1;
		if (this.winningElements + 1 >= this.maxElements) {
			this.decreaseWinnings();
		}
		this.shadowRoot.querySelector('#max-elements').textContent = this.maxElements;
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

	render() {
		return html`
		<h2>Settings</h2>
		<div class="settings">
			<div class="counter">
				<svg height="50" width="25" @click="${this.decreaseElements}">
  					<polygon points="25,0 25,50 0,25"/>
	  			</svg>
				<div id="max-elements" class="digit">${this.maxElements}</div>
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
			<p>total elements</p>
			<p>winning numbers</p>
		</div>`;
	}


	_getRandomInt(max) {
	  return Math.floor(Math.random() * max);
	}
}

window.customElements.define('guess-settings', GuessSettings);