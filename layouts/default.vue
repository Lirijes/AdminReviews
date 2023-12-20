<script setup lang="ts">
  const searchTerm = ref('');

  const updateSearchTerm = (newTerm : string) => {
    searchTerm.value = newTerm;
  };
</script>

<template>
  <div class="default-layout">
    <Sidemenu :modelValue="searchTerm" @update:modelValue="updateSearchTerm" />
    <slot />
  </div>
</template>

<style lang="scss">
@import "./assets/style/index.scss";

:root {
  //--text-color: #{$textColor}; // special syntaxt for it to understand its not just a simple string
  //--hover-color: #{$hoverColor};
}

.default-layout {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $color-smooth-gray;
}

.default-layout :deep(.page) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
