import {LitElement, html, css} from 'lit';
import {CountDownTimer} from './timer.js';

export class ClickerDashboard extends LitElement {
	
	constructor(countDownTimer) {
		super();
		this.timer = countDownTimer;
	}

	showTimer() {
		const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
		this.timer.start().then(() => console.log('showTimer done'));
		console.log('play clicked');
	}

	render() {
		return html`<p>
						Timer status: ${this.timer.isStillRun() ? 'working' : 'stopped'}. 
						Seconds: ${this.timer.getRemainedSeconds()}</p>`
	}
}

window.customElements.define('clicker-dashboard', ClickerDashboard);