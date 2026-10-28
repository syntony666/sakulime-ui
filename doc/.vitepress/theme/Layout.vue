<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { onMounted, ref, watch } from "vue";

const { Layout } = DefaultTheme;
const theme = ref("sakulime");

// themes self-discover from the palette package — adding a css file
// there adds a dot; its color is the palette's own --sl-primary
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
});
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <div class="sl-theme-switch">
        <span
          class="sl-theme-dot"
          :style="{ '--dot': themes.find((t) => t.value === theme)?.color }"
        />
        <select v-model="theme" aria-label="主題">
          <option v-for="t in themes" :key="t.value" :value="t.value">
            {{ t.label }}
          </option>
        </select>
      </div>
    </template>
  </Layout>
</template>
