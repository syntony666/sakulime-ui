import "../css/button.css";
import "../css/icon.css";
import { defineSlButton } from "./button";
import { defineSlIcon } from "./icon";

export { SlButton } from "./button";
export { SlIcon } from "./icon";

export function defineElements(): void {
  defineSlButton();
  defineSlIcon();
}

defineElements();
