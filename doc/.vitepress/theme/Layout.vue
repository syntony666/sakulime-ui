<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import sakulimeCss from "@sakulime-ui/theme/sakulime.css?raw";
import terraCss from "@sakulime-ui/theme/terra.css?raw";
import { onMounted, ref, watch } from "vue";

const { Layout } = DefaultTheme;
const theme = ref("sakulime");

// each dot is the theme's signature primary, pulled from the palette
// source itself — palette edits move the dots, nothing hand-synced
const pick = (css: string, token: string) =>
  css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1] ?? "#888";

const themes = [
  { value: "sakulime", label: "Sakulime", color: pick(sakulimeCss, "--sl-primary") },
  { value: "terra", label: "Terra", color: pick(terraCss, "--sl-primary") },
];

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
      <div class="sl-theme-switch" role="radiogroup" aria-label="主題">
        <button
          v-for="t in themes"
          :key="t.value"
          :class="['sl-theme-dot', { active: theme === t.value }]"
          :style="{ '--dot': t.color }"
          :title="t.label"
          :aria-pressed="theme === t.value"
          @click="theme = t.value"
        />
      </div>
    </template>
  </Layout>
</template>
