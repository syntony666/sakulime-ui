<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import pkg from "../../../package.json";

const { Layout } = DefaultTheme;
const { version } = pkg;
const isPreview = import.meta.env.VITE_DOC_PREVIEW === "true";
const theme = ref("sakulime");
const open = ref(false);
const switchEl = ref<HTMLElement>();
const triggerEl = ref<HTMLButtonElement>();
const optionEls = ref<(HTMLElement | null)[]>([]);

const palettes = import.meta.glob("../../../packages/theme/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
});
const pick = (css: string, token: string) =>
  css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1] ?? "#888";

const basename = (path: string) => path.match(/([^/]+)\.css$/)![1];
const themes = Object.keys(palettes)
  .sort((a, b) => basename(a).localeCompare(basename(b)))
  .map((path) => {
    const name = basename(path);
    return {
      value: name,
      label: name
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
      color: pick(palettes[path] as string, "--sl-seed-primary"),
      color2: pick(palettes[path] as string, "--sl-seed-secondary"),
      dark: /color-scheme:\s*dark/.test(palettes[path] as string),
    };
  });

const active = computed(() => themes.find((t) => t.value === theme.value));

const choose = (value: string) => {
  theme.value = value;
  close(true);
};

const close = (refocus = false) => {
  open.value = false;
  if (refocus) triggerEl.value?.focus();
};

const focusOption = (i: number) => {
  const n = themes.length;
  optionEls.value[((i % n) + n) % n]?.focus();
};

const openMenu = (i?: number) => {
  open.value = true;
  nextTick(() =>
    focusOption(i ?? themes.findIndex((t) => t.value === theme.value)),
  );
};

const onMenuKeydown = (e: KeyboardEvent) => {
  const i = optionEls.value.findIndex((el) => el === document.activeElement);
  if (e.key === "ArrowDown") {
    e.preventDefault();
    focusOption(i + 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusOption(i - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    focusOption(0);
  } else if (e.key === "End") {
    e.preventDefault();
    focusOption(themes.length - 1);
  }
};

const onClickOutside = (e: MouseEvent) => {
  if (!switchEl.value?.contains(e.target as Node)) open.value = false;
};

const onFocusOut = (e: FocusEvent) => {
  if (!switchEl.value?.contains(e.relatedTarget as Node)) open.value = false;
};

const GLOSS_TAIL = /^(.+?)\s+([一-鿿豈-﫿％-￯　-〿]+)$/;
const ATTR_TAIL = /^(.+?)\s+(sl-\S+)$/;
const patchOutlineGloss = () => {
  document.querySelectorAll(".VPDocOutlineItem a").forEach((a) => {
    if (a.childElementCount > 0) return;
    const text = a.textContent ?? "";
    const m = text.match(GLOSS_TAIL) ?? text.match(ATTR_TAIL);
    if (!m) return;
    a.textContent = `${m[1]} `;
    const span = document.createElement("span");
    span.className = m[2].startsWith("sl-") ? "toc-attr" : "toc-gloss";
    span.textContent = m[2];
    a.appendChild(span);
  });
};

onMounted(() => {
  patchOutlineGloss();
  const glossObserver = new MutationObserver(patchOutlineGloss);
  glossObserver.observe(document.body, { childList: true, subtree: true });
  const saved = localStorage.getItem("sl-theme");
  if (saved && themes.some((t) => t.value === saved)) theme.value = saved;
  watch(
    theme,
    (v) => {
      document.documentElement.dataset.theme = v;
      // the theme's declared color-scheme flips vitepress's own dark
      const dark = themes.find((t) => t.value === v)?.dark === true;
      document.documentElement.classList.toggle("dark", dark);
      localStorage.setItem("sl-theme", v);
      localStorage.setItem("sl-dark", dark ? "1" : "0");
    },
    { immediate: true },
  );
  document.addEventListener("click", onClickOutside);
});
onUnmounted(() => document.removeEventListener("click", onClickOutside));
</script>

<template>
  <Layout>
    <template #layout-top>
      <aside
        v-if="isPreview"
        class="sl-preview-banner"
        role="note"
        aria-label="預覽版本"
      >
        此為預覽版本，僅供測試與審閱。
      </aside>
    </template>
    <template #nav-bar-content-after>
      <div>
        <span class="sl-version">v{{ version }}</span>
      </div>
      <div
        ref="switchEl"
        class="sl-theme-switch"
        @keydown.escape="close(true)"
        @focusout="onFocusOut"
      >
        <button
          ref="triggerEl"
          class="sl-theme-current"
          type="button"
          aria-haspopup="listbox"
          :aria-expanded="open"
          @click="open = !open"
          @keydown.down.prevent="openMenu()"
          @keydown.up.prevent="openMenu(themes.length - 1)"
        >
          <span
            class="sl-theme-dot"
            aria-hidden="true"
            :style="{
              '--dot': active?.color,
              '--dot-2': active?.color2,
              '--dot-mode': active?.dark ? '#000' : '#fff',
            }"
          />
          <span class="sl-theme-name">{{ active?.label }}</span>
          <svg
            class="sl-theme-caret"
            aria-hidden="true"
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
        <ul
          v-if="open"
          class="sl-theme-menu"
          role="listbox"
          @keydown="onMenuKeydown"
        >
          <li v-for="(t, i) in themes" :key="t.value" role="presentation">
            <button
              :ref="(el) => (optionEls[i] = el as HTMLElement)"
              class="sl-theme-option"
              type="button"
              role="option"
              :aria-selected="theme === t.value"
              tabindex="-1"
              @click="choose(t.value)"
            >
              <span
                class="sl-theme-dot"
                aria-hidden="true"
                :style="{
                  '--dot': t.color,
                  '--dot-2': t.color2,
                  '--dot-mode': t.dark ? '#000' : '#fff',
                }"
              />
              <span>{{ t.label }}</span>
            </button>
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>
