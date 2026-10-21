import { defineElement } from "./define";

export class SlButton extends HTMLElement {
  static observedAttributes = ["tone", "variant", "size", "invert", "disabled", "type"];

  private button: HTMLButtonElement | null = null;

  connectedCallback(): void {
    if (this.button) return;
    const button = document.createElement("button");
    while (this.firstChild) button.appendChild(this.firstChild);
    this.appendChild(button);
    this.button = button;
    this.sync();
  }

  attributeChangedCallback(): void {
    this.sync();
  }

  private sync(): void {
    const button = this.button;
    if (!button) return;

    const tone = this.getAttribute("tone") ?? "primary";
    const variant = this.getAttribute("variant");
    const size = this.getAttribute("size") ?? "md";

    const classes = ["sl-button", `sl-button--${tone}`, `sl-button--${size}`];
    if (variant && variant !== "normal") classes.push(`sl-button--${variant}`);
    if (this.hasAttribute("invert")) classes.push("is-invert");
    button.className = classes.join(" ");

    button.disabled = this.hasAttribute("disabled");
    button.type = (this.getAttribute("type") ?? "button") as HTMLButtonElement["type"];
  }
}

export function defineSlButton(): void {
  defineElement("sl-button", SlButton);
}
