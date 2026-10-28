<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { showMarkup } from "../../stories/util/docs-source";
import demoCss from "./demo-content.css?inline";

const props = withDefaults(
  defineProps<{
    render: (args?: Record<string, unknown>) => string;
    args?: Record<string, unknown>;
    code?: boolean;
  }>(),
  { code: true },
);

const html = computed(() => props.render(props.args));
const source = computed(() => showMarkup(html.value));
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
    <pre v-if="code" class="sl-demo-src"><code>{{ source }}</code></pre>
  </div>
</template>
