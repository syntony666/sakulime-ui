<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { highlightMarkup, showMarkup } from "../../demos/util/docs-source";
import demoCss from "./demo-content.css?inline";

const props = withDefaults(
  defineProps<{
    render: (args?: Record<string, unknown>) => string;
    args?: Record<string, unknown>;
    code?: boolean;
  }>(),
  { code: true },
);

// args may be unbound for static demos — render({}) must not crash and
// take the whole page down with it
const html = computed(() => props.render(props.args ?? {}));
const source = computed(() => highlightMarkup(html.value));
const plain = computed(() => showMarkup(html.value));

// axis dumps run 25-40 lines for a one-token delta — collapse those;
// short snippets (playground output) stay open as living evidence
const COLLAPSE_LINES = 14;
const lineCount = computed(() => plain.value.split("\n").length);
const collapsible = computed(() => lineCount.value > COLLAPSE_LINES);

const copied = ref(false);
const copy = async () => {
  await navigator.clipboard.writeText(plain.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
};

const host = ref<HTMLElement | null>(null);

// render inside a shadow root — the page's unlayered resets would
// otherwise beat the whole sl layer system (theme < base < attrs)
onMounted(() => {
  const root = host.value!.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = demoCss;
  const stage = document.createElement("div");
  root.append(style, stage);
  watch(html, (v) => (stage.innerHTML = v), { immediate: true });
});
</script>

<template>
  <div class="sl-demo">
    <div ref="host" class="sl-demo-stage" />
    <details v-if="code" class="sl-demo-src-wrap" :open="!collapsible">
      <summary class="sl-demo-src-bar">
        <span class="sl-demo-src-label">原始碼</span>
        <button type="button" class="sl-demo-copy" @click.prevent.stop="copy">
          {{ copied ? "已複製" : "複製" }}
        </button>
      </summary>
      <pre class="sl-demo-src"><code v-html="source"></code></pre>
    </details>
  </div>
</template>
