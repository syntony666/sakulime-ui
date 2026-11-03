<script setup lang="ts">
import { computed, reactive } from "vue";
import Demo from "./Demo.vue";

type Field = {
  key: string;
  name: string;
  desc?: string;
  kind: "select" | "boolean" | "text";
  options?: string[];
};

const props = defineProps<{
  meta: { args?: Record<string, unknown>; argTypes?: Record<string, any> };
  render: (args: Record<string, unknown>) => string;
}>();

const args = reactive<Record<string, unknown>>({ ...(props.meta.args ?? {}) });

const fields = computed<Field[]>(() =>
  Object.entries(props.meta.argTypes ?? {}).map(([key, t]) => ({
    key,
    name: t.name ?? key,
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

const descHtml = (desc?: string) =>
  desc?.replace(/`?(sl-[\w-]+)`?/g, (_, m) => `<code>${m}</code>`) ?? "";

const hasDashOption = computed(() =>
  fields.value.some((f) => f.options?.includes("-")),
);
</script>

<template>
  <div class="sl-play">
    <Demo :render="render" :args="args" />
    <div class="sl-play-fields">
      <label v-for="f in fields" :key="f.key" class="sl-play-field">
        <span class="sl-play-name" translate="no">{{ f.name }}</span>
        <select v-if="f.kind === 'select'" v-model="args[f.key]">
          <option v-for="o in f.options" :key="o" :value="o">{{ o }}</option>
        </select>
        <input v-else-if="f.kind === 'boolean'" v-model="args[f.key]" type="checkbox" />
        <input v-else v-model="args[f.key]" type="text" spellcheck="false" />
        <span v-if="f.desc" class="sl-play-desc" v-html="descHtml(f.desc)" />
      </label>
      <p v-if="hasDashOption" class="sl-play-note">
        <code>-</code> 表示不寫這個屬性，用預設值；元件標記欄位的 <code>-</code> 是寫裸屬性
      </p>
    </div>
  </div>
</template>
