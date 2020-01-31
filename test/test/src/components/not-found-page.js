import { PolymerElement, html } from '@polymer/polymer/polymer-element';
class NotFoundPage extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        padding: 10px 20px;
      }
    </style>

    Oops you hit a 404. <a href="/">Head back to home.</a>
`;
  }
}

window.customElements.define('not-found-page', NotFoundPage);
