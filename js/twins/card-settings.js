import {html, LitElement} from "lit";

export class CardSettings extends LitElement {

    static ROWS = [2, 4, 6];
    static COLUMNS = [2, 3, 4, 5];

    constructor() {
        super();
        this.rows = CardSettings.ROWS[0];
        this.columns = CardSettings.COLUMNS[0];
    }

    updateRows(event) {
        this.rows = Number.parseInt(event.target.value);
        console.log('Rows updated: ' + this.rows);
    }

    updateColumns(event) {
        this.columns = Number.parseInt(event.target.value);
        console.log('Columns updated: ' + this.columns);
    }

    render() {
        return html`
            <label>Select rows: 
                <select @change="${this.updateRows}">
                    ${CardSettings.ROWS
                            .map(row => html`<option value="${row}" ?checked="${this.rows === row}">${row}</option>`)}
                </select>
            </label>
            <label>Select columns:
                <select @change="${this.updateColumns}">
                    ${CardSettings.COLUMNS
                            .map(column => html`<option value="${column}" ?checked="${column === this.columns}">${column}</option>`)}
                </select>
            </label>
        `
    }
}