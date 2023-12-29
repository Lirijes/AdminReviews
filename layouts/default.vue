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
  background-color: $color-smooth-gray;

  @media screen and (max-width: 576px) {
    .sidemenu {
      flex: 1; // take up all the space when under 576px screen
    }

    .page-content {
      display: none;
    }
  }

  .sidemenu {
    flex: 0 0 300px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}

.default-layout :deep(.page) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  width: 100%;

  @media screen and (min-width: 576px) and (max-width: 768px) {
    margin-left: 70px; 
  }
}
</style>
