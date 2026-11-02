<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { resolveIcons } from "@sakulime-ui/core/icons";
import { highlightMarkup, showMarkup } from "../../demos/util/docs-source";
import demoCss from "./demo-content.css?inline";

const props = withDefaults(
  defineProps<{
    render: (args?: Record<string, unknown>) => string;
    args?: Record<string, unknown>;
    code?: boolean;
    pad?: boolean;
    measure?: string;
  }>(),
  { code: true, pad: true },
);

// args may be unbound for static demos — render({}) must not crash and
const html = computed(() => props.render(props.args ?? {}));
const plain = computed(() => showMarkup(html.value));
const source = computed(() => highlightMarkup(plain.value));

const COLLAPSE_LINES = 14;
const lineCount = computed(() => plain.value.split("\n").length);
const collapsible = computed(() => lineCount.value > COLLAPSE_LINES);

const copied = ref(false);
const copy = async () => {
  try {
    await navigator.clipboard.writeText(plain.value);
  } catch {
    return;
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
};

const host = ref<HTMLElement | null>(null);

let sharedSheet: CSSStyleSheet | undefined;
const stageSheet = () => {
  sharedSheet ??= (() => {
    const s = new CSSStyleSheet();
    s.replaceSync(demoCss);
    return s;
  })();
  return sharedSheet;
};

onMounted(() => {
  const root = host.value!.attachShadow({ mode: "open" });
  try {
    root.adoptedStyleSheets = [stageSheet()];
  } catch {
    const style = document.createElement("style");
    style.textContent = demoCss;
    root.appendChild(style);
  }
  const stage = document.createElement("div");
  root.appendChild(stage);
  const measure = () => {
    if (!props.measure) return;
    stage.querySelectorAll<HTMLElement>(props.measure).forEach((el) => {
      const badge = el.querySelector(".demo-w");
      if (badge) badge.textContent = `${el.offsetWidth}px`;
    });
  };
  watch(
    html,
    async (v) => {
      stage.innerHTML = v;
      // the document observer can't see into shadow roots — demos
      resolveIcons(stage);
      await nextTick();
      measure();
    },
    { immediate: true },
  );
  if (props.measure) {
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    onUnmounted(() => observer.disconnect());
  }
});
</script>

<template>
  <div class="sl-demo">
    <div ref="host" class="sl-demo-stage" :class="{ 'sl-demo-stage-flush': !pad }" />
    <details v-if="code" class="sl-demo-src-wrap" :open="!collapsible">
      <summary class="sl-demo-src-bar">
        <span class="sl-demo-src-label">原始碼</span>
        <button
          type="button"
          class="sl-demo-copy"
          aria-live="polite"
          @click.prevent.stop="copy"
        >
          {{ copied ? "已複製" : "複製" }}
        </button>
      </summary>
      <pre class="sl-demo-src"><code v-html="source"></code></pre>
    </details>
  </div>
</template>
