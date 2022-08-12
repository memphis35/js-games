import {LitElement, html, css} from 'lit';

class DefaultButton extends LitElement {

	static properties = {
		title: {type: String},
		type: {type: String}
	};

	static styles = css`
		button {
			background-color: white;
			border: 2px solid lightgray;
			border-radius: 10px;
			display: block;
			height: 50px;
			padding: 0 10px;
			color: gray;
			transition: all 0.5s;
		}

		button:hover {
			background-color: lightgray;
			border-color: gray;
			color: black;
		}

		button:active {
			transform: scale(0.9, 0.9);
		}
	`;

	randomName() {
		fetch('https://random-data-api.com/api/food/random_food')
			.then(response => response.json())
			.then(data => this.title = data.dish);
		this.requestUpdate();
	}

	render() {
		return html`
			<button @click="${this.randomName}" type="${this.type ?? 'button'}">
				${this.title ?? 'Default Button'}
			</button>
		`;
	}
}

window.customElements.define('default-button', DefaultButton);