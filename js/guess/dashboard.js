import {LitElement, html, css} from 'lit';

export class DashBoard extends LitElement {

	constructor() {
		super();
		this._wins = 0;
		this._losses = 0;
		this._count = 0;
		this._ratio = 0;
	}

	static styles = css`
		.dashboard {
			width: 500px;
			display: flex;
			justify-content: space-evenly;
		}

		.value {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;
			min-width: 250px;
		}

		span {
			font-size: xx-large;
			font-weight: bold;
		}

		.red {
			color: #b30000;
		}

		.green {
			color: green;
		}

		.blue {
			color: #809fff;
		}
	`;

	render() {
		return html`
		<div class="dashboard">
			<div class="value">
				<span class="green">${this._wins}</span>
				<h2>wins</h2>
			</div>
			<div class="value">
				<span class="red">${this._losses}</span>
				<h2>losses</h2>
			</div>
			<div class="value">
				<span class="blue">${this._ratio.toPrecision(2)}</span>
				<h2>winrate</h2>
			</div>`;
	}

	addWin() {
		this._wins += 1;
		this._count += 1;
		this._ratio = this._wins / this._count;
		this.requestUpdate();
	}

	addLoss() {
		this._losses += 1;
		this._count += 1;
		this._ratio = this._wins / this._count;
		this.requestUpdate();
	}

}

window.customElements.define('dash-board', DashBoard);