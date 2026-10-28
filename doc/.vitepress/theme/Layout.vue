<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const { Layout } = DefaultTheme;
const theme = ref("sakulime");
const open = ref(false);
const switchEl = ref<HTMLElement>();

// themes self-discover from the palette package — adding a css file
// there adds an option; its color is the palette's own --sl-primary
const palettes = import.meta.glob("../../../packages/shared/theme/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
});
const pick = (css: string, token: string) =>
  css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1] ?? "#888";

const themes = Object.keys(palettes)
  .sort()
  .map((path) => {
    const name = path.match(/([^/]+)\.css$/)![1];
    return {
      value: name,
      label: name[0].toUpperCase() + name.slice(1),
      color: pick(palettes[path] as string, "--sl-primary"),
    };
  });

const active = computed(() => themes.find((t) => t.value === theme.value));

const choose = (value: string) => {
  theme.value = value;
  open.value = false;
};

const onClickOutside = (e: MouseEvent) => {
  if (!switchEl.value?.contains(e.target as Node)) open.value = false;
};

// data-theme drives the sakulime token cascade — SSR has no document,
// so set it post-mount and on every toggle
onMounted(() => {
  watch(
    theme,
    (v) => {
      document.documentElement.dataset.theme = v;
    },
    { immediate: true },
  );
  document.addEventListener("click", onClickOutside);
});
onUnmounted(() => document.removeEventListener("click", onClickOutside));
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <div ref="switchEl" class="sl-theme-switch">
        <button
          class="sl-theme-current"
          type="button"
          aria-haspopup="listbox"
          :aria-expanded="open"
          @click="open = !open"
        >
          <span class="sl-theme-dot" :style="{ '--dot': active?.color }" />
          <span>{{ active?.label }}</span>
          <svg
            class="sl-theme-caret"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <ul v-if="open" class="sl-theme-menu" role="listbox">
          <li
            v-for="t in themes"
            :key="t.value"
            role="option"
            :aria-selected="theme === t.value"
            @click="choose(t.value)"
          >
            <span class="sl-theme-dot" :style="{ '--dot': t.color }" />
            <span>{{ t.label }}</span>
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>
