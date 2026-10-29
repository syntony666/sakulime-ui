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

const { Layout } = DefaultTheme;
const theme = ref("sakulime");
const open = ref(false);
const switchEl = ref<HTMLElement>();
const triggerEl = ref<HTMLButtonElement>();
const optionEls = ref<(HTMLElement | null)[]>([]);

// themes self-discover from the palette package — adding a css file
// there adds an option; its color is the theme's authored seed
const palettes = import.meta.glob("../../../packages/shared/theme/*.css", {
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
    };
  });

const active = computed(() => themes.find((t) => t.value === theme.value));

const choose = (value: string) => {
  theme.value = value;
  open.value = false;
};

const close = (refocus = false) => {
  open.value = false;
  if (refocus) triggerEl.value?.focus();
};

const focusOption = (i: number) => {
  const n = themes.length;
  optionEls.value[((i % n) + n) % n]?.focus();
};

// the menu pins its width to the trigger's real box (the divider
// padding inflates the switch's box, so % can't express this)
const menuWidth = ref("100%");
watch(open, (v) => {
  if (v && triggerEl.value)
    menuWidth.value = `${triggerEl.value.offsetWidth}px`;
});

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

// data-theme drives the sakulime token cascade — SSR has no document,
// so set it post-mount and on every toggle; the choice persists in
// localStorage (restored pre-paint by the head script in config.mts)
onMounted(() => {
  const saved = localStorage.getItem("sl-theme");
  if (saved && themes.some((t) => t.value === saved)) theme.value = saved;
  watch(
    theme,
    (v) => {
      document.documentElement.dataset.theme = v;
      // the -dark suffix convention also flips vitepress's own dark
      // internals (dual shiki themes, dark-only chrome rules)
      document.documentElement.classList.toggle("dark", v.endsWith("-dark"));
      localStorage.setItem("sl-theme", v);
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
          <span class="sl-theme-dot" :style="{ '--dot': active?.color }" />
          <span class="sl-theme-name">{{ active?.label }}</span>
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
        <ul
          v-if="open"
          class="sl-theme-menu"
          role="listbox"
          :style="{ width: menuWidth }"
          @keydown="onMenuKeydown"
        >
          <li
            v-for="(t, i) in themes"
            :key="t.value"
            role="option"
            :aria-selected="theme === t.value"
          >
            <button
              :ref="(el) => (optionEls[i] = el as HTMLElement)"
              class="sl-theme-option"
              type="button"
              tabindex="-1"
              @click="choose(t.value)"
            >
              <span class="sl-theme-dot" :style="{ '--dot': t.color }" />
              <span>{{ t.label }}</span>
            </button>
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>
