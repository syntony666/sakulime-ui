<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { onMounted, ref, watch } from "vue";

const { Layout } = DefaultTheme;
const theme = ref("sakulime");

// each dot is the theme's signature primary — pick a color, get a theme
const themes = [
  { value: "sakulime", label: "Sakulime", color: "#ff5980" },
  { value: "terra", label: "Terra", color: "#c05621" },
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
