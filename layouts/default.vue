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
}

.default-layout {
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  background-color: $color-gray-lighter;
}

.default-layout :deep(.page) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  width: 100%;

  @media screen and (min-width: 370px) and (max-width: 992px) {
    margin-left: 70px;
  }

  @media screen and (min-width: 992px) {
    margin-left: 300px;
  }

  @media screen and (min-width: 1200px) {
    margin-left: 400px;
  }
}
</style>
