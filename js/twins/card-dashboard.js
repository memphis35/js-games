import {html, LitElement} from "lit";

class CardDashboardTimer extends LitElement {

    constructor() {
        super();
        this.seconds = 0;
        this.started = false;
        this.stopped = false;
    }

    start() {
        this.started = true;
        this.seconds += 1;
        this.requestUpdate();
        if (this.seconds > 0 && !this.stopped) {
            setTimeout(() => {
                this.start();
            }, 1000);
        }
    }

    stop() {
        this.stopped = true;
    }

    renderTime() {
        if (this.seconds < 60) {
            return `0' ${this.seconds}''`
        } else {
            const min = Math.floor(this.seconds / 60);
            const sec = this.seconds % 60;
            return `${min}' ${sec}''`;
        }
    }

    render() {
        return html`<p @click="${this.start}">Time elapsed: ${this.renderTime()}"</p>`
    }
}

export class CardDashboard extends LitElement {
    constructor(pairs) {
        super();
        this.remainingPairs = pairs;
        this.timer = new CardDashboardTimer();
    }

    startTimer() {
        this.timer.start();
    }

    render() {
        return html`
            <p>Pairs remained: ${this.remainingPairs}</p>
            ${this.timer}
        `;
    }

    decreaseRemaining() {
        this.remainingPairs -= 1;
        this.requestUpdate();
    }
}

window.customElements.define('card-dashboard-timer', CardDashboardTimer);