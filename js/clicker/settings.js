import {LitElement, html, css} from 'lit';

class ClickerSettings extends LitElement {

	render() {
		return html`<h2>Settings</h2>`;
	}
}

window.customElements.define('clicker-settings', ClickerSettings);