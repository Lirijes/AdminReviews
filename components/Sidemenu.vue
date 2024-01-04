<script setup lang="ts">

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["update:modelValue"]);
const showWholeMenu = ref(true);

const updateModelValue = (newValue: any) => {
  emit('update:modelValue', newValue);
};

const toggleMenu = () => {
  showWholeMenu.value = !showWholeMenu.value;
};

const handleResize = () => {
    showWholeMenu.value = window.innerWidth > 992;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="sidemenu">
    <div
      class="sidemenu__container"
      :class="{ 'sidemenu__container--closed': !showWholeMenu
     }"
    >
    <OpenMenu 
      v-if="showWholeMenu" 
      :toggleMenu="toggleMenu"
      :modelValue="props.modelValue"
      @update:modelValue="updateModelValue"
      :showWholeMenu="showWholeMenu"
    />
    <ClosedMenu 
      v-if="!showWholeMenu" 
      :toggleMenu="toggleMenu" 
      :showWholeMenu="showWholeMenu"
    />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/style/index.scss";

.sidemenu {
  position: fixed;
  min-height: 100vh;
  width: 100%;
  flex: 0 0 300px;
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 370px) and (max-width: 505px) {
    width: 74%;
  }

  @media screen and (min-width: 576px) and (max-width: 992px) {
    flex: none;
    width: 300px;
  }

  @media screen and (min-width: 992px) {
    flex: none;
    width: 300px;
  }

  @media screen and (min-width: 1200px) {
    flex: none;
    width: 400px;
  }

  &__container {
    position: absolute;
    border-radius: 20px;
    border: 1px solid $color-cloud-gray;
    padding: 20px;
    height: 100%;
    width: 100%;
    background-color: $color-smooth-gray;

    &--closed {
      width: 20px;
      box-sizing: content-box;
    }
  }
}
</style>
