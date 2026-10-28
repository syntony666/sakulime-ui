<script setup lang="ts">
// swatch grid reads --sl-* vars live — switching the nav theme dots
// recolors every chip, so this page demos the switcher itself
const groups: [string, string[]][] = [
  ["背景", ["bg", "surface", "border"]],
  ["文字", ["text", "text-strong", "text-accent", "text-invert", "text-secondary", "text-muted"]],
  ["主題", ["primary", "primary-fg", "primary-bg", "secondary", "secondary-fg", "secondary-bg"]],
  ["狀態", ["ok", "warn", "danger"]],
];
</script>

<template>
  <div>
    <div v-for="[label, keys] in groups" :key="label" class="sl-sw-group">
      <div class="sl-sw-label">{{ label }}</div>
      <div class="sl-sw-row">
        <div v-for="n in keys" :key="n" class="sl-sw-item">
          <span class="sl-sw-chip" :style="{ background: `var(--sl-${n})` }" />
          <code class="sl-sw-name">--sl-{{ n }}</code>
        </div>
      </div>
    </div>
  </div>
</template>
