<script setup lang="ts">
const props = defineProps<{
  toggleMenu: () => void;
  showWholeMenu: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div v-if="!showWholeMenu" class="closed-menu">
    <button class="light-background-btn" @click="props.toggleMenu">
      <font-awesome-icon :icon="['fas', 'angles-right']" />
    </button>
    <div class="closed-menu__icons">
      <NuxtLink to="/">
        <font-awesome-icon
          class="closed-menu-icon"
          :icon="['fas', 'magnifying-glass']"
        />
      </NuxtLink>
      <NuxtLink to="/">
        <font-awesome-icon
          class="closed-menu-icon"
          :icon="['fas', 'bars-staggered']"
        />
      </NuxtLink>
      <NuxtLink to="/">
        <font-awesome-icon class="closed-menu-icon" :icon="['fas', 'check']" />
      </NuxtLink>
      <NuxtLink to="/">
        <font-awesome-icon class="closed-menu-icon" :icon="['fas', 'xmark']" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/style/index.scss";

.closed-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  cursor: pointer;

  &__icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin-top: 20px;

    &-icon {
      margin-bottom: 15px;
    }
  }
}
</style>
