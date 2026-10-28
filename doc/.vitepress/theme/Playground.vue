<script setup lang="ts">
import { computed, reactive } from "vue";
import Demo from "./Demo.vue";

type Field = {
  key: string;
  desc?: string;
  kind: "select" | "boolean" | "text";
  options?: string[];
};

const props = defineProps<{
  meta: { args?: Record<string, unknown>; argTypes?: Record<string, any> };
  render: (args: Record<string, unknown>) => string;
}>();

const args = reactive<Record<string, unknown>>({ ...(props.meta.args ?? {}) });

// meta.argTypes doubles as the controls schema — axisArg() already emits
// control.type / options / description
const fields = computed<Field[]>(() =>
  Object.entries(props.meta.argTypes ?? {}).map(([key, t]) => ({
    key,
    desc: t.description,
    kind:
      t.control?.type === "boolean" || typeof args[key] === "boolean"
        ? "boolean"
        : t.options?.length
          ? "select"
          : "text",
    options: t.options,
  })),
);

// attr names in descriptions render as nowrap code spans — keeps tokens
// like sl-card-corner from splitting across lines in the narrow column
const descHtml = (desc?: string) =>
  desc?.replace(/`?(sl-[\w-]+)`?/g, (_, m) => `<code>${m}</code>`) ?? "";
</script>

<template>
  <div class="sl-play">
    <Demo :render="render" :args="args" />
    <div class="sl-play-fields">
      <label v-for="f in fields" :key="f.key" class="sl-play-field">
        <span class="sl-play-name">{{ f.key }}</span>
        <select v-if="f.kind === 'select'" v-model="args[f.key]">
          <option v-for="o in f.options" :key="o" :value="o">{{ o }}</option>
        </select>
        <input v-else-if="f.kind === 'boolean'" v-model="args[f.key]" type="checkbox" />
        <input v-else v-model="args[f.key]" type="text" />
        <span class="sl-play-desc" v-html="descHtml(f.desc)" />
      </label>
    </div>
  </div>
</template>
