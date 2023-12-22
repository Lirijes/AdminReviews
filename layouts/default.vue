<script setup lang="ts">
const searchTerm = ref("");

const updateSearchTerm = (newTerm: string) => {
  searchTerm.value = newTerm;
};
</script>

<template>
  <div class="default-layout">
    <Sidemenu :modelValue="searchTerm" @update:modelValue="updateSearchTerm" />
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/style/index.scss";

:root {
  //--text-color: #{$textColor}; // special syntaxt for it to understand its not just a simple string
  //--hover-color: #{$hoverColor};
}

.default-layout {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  background-color: $color-smooth-gray;

  @media screen and (max-width: 600px) {
    .sidemenu {
      flex: 1; // take up all the space when under 600px screen
    }

    .page-content {
      display: none;
    }
  }
}

.default-layout :deep(.page) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
