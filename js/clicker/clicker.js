import {LitElement, html, css} from 'lit';
import {ClickerSettings} from './clicker-settings.js';
import {ClickerDashboard} from './clicker-dashboard.js';
import {CountDownTimer} from './timer.js';

class PointClicker extends LitElement {
	constructor() {
		super();
		this.settings = new ClickerSettings();
		this.timer = new CountDownTimer();
		this.timer.setUp(5);
		this.dashboard = new ClickerDashboard(this.timer);
	}

	static styles = css`
		.gamebox {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	`;

	play() {
		this.dashboard.showTimer();
	}

	render() {
		return html`
		<div class="gamebox">
			<h1>Point Clicker</h1>
			${this.settings}
			${this.dashboard}
		</div>
		`;
	}
}

window.customElements.define('point-clicker', PointClicker);