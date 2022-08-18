import {LitElement, html, css} from 'lit';

export class ClickerSettings extends LitElement {

	constructor() {
		super();
	}

	render() {
		return html`<h2>Settings</h2>`;
	}
}

window.customElements.define('clicker-settings', ClickerSettings);