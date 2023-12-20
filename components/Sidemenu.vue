<script setup lang="ts">
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['update:modelValue']);

interface Review {
  id: number;
  name: string;
  stars: number;
  comment: string;
}

const items: Review[] = [
  { id: 166743, name: 'Lea', stars: 3, comment: "fin" },
  { id: 245678, name: 'Nora', stars: 5, comment: "bäst" },
  { id: 367890, name: 'Maya', stars: 1, comment: "för stor" },
  { id: 367891, name: 'Maya', stars: 5, comment: "perfekt" },
];

const searchResults = ref<Review[]>([]);
const showWholeMenu = ref(true);

function handleSearch() {
  const searchTerm = props.modelValue.toLowerCase();

  // If the search term is empty, display all items
  if (!searchTerm) {
    searchResults.value = [...items];
  } else {
    // Perform a search based on 'name' and 'comment' properties
    searchResults.value = items.filter(
      item => item.name.toLowerCase().includes(searchTerm) || item.comment.toLowerCase().includes(searchTerm)
    );
  }
};

function toggleMenu() {
  showWholeMenu.value = !showWholeMenu.value;
}
</script>

<template>
    <div class="sidemenu">
        <div class="sidemenu__container" :class="{ 'sidemenu__container--closed': !showWholeMenu }">
            <div v-if="showWholeMenu" class="sidemenu__container-open-menu">
                <div class="sidemenu__container-open-menu-header">
                    <button class="sidemenu-btn" @click="toggleMenu"><font-awesome-icon :icon="['fas', 'angle-left']" /></button>
                    <h2 class="sidemenu__container-open-menu-header-title">sidemenu</h2>
                </div>
                <div class="sidemenu__container-open-menu-search">
                    <input 
                        class="sidemenu__container-open-menu-search-input" 
                        type="search" 
                        :value="props.modelValue" 
                        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)" 
                        @keyup.enter="handleSearch" 
                        placeholder="search.." 
                    /> 
                </div>
            </div>
            <div v-if="!showWholeMenu" class="sidemenu__container-closed-menu">
                <button class="sidemenu-btn" @click="toggleMenu"><font-awesome-icon :icon="['fas', 'angle-right']" /></button>
                <div class="sidemenu__container-closed-menu-icons">
                    <font-awesome-icon 
                class="sidemenu__container-closed-menu-search-icon" 
                :icon="['fas', 'magnifying-glass']"  
                @click="handleSearch" 
            />
                </div>
            </div>
            <!-- need to move this eventually to a new page -->
            <!-- <p v-if="searchResults.length === 0">No reviews were found.</p>
            <ul v-if="searchResults.length > 0">
                <li v-for="result in searchResults" :key="result.id">{{ result.name }} - ID: {{ result.id }} - Stars: {{ result.stars }} - Comment: {{ result.comment }}</li>
            </ul> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.sidemenu {
    position: relative;
    min-height: 100vh;
    width: 250px;

    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: 1px solid $color-cloud-gray;
        padding: 20px;

        &--closed {
            width: 70px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        &-open-menu {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            &-header {
                display: flex;
                align-items: center;
                justify-content: start;

                // .sidemenu-btn {
                //     position: absolute;
                //     top: 0;
                //     left: 0;
                // }

                &-title {
                    font-size: 24px;
                }
            }

            &-search {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 10px 0;
            }
        }

        &-closed-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            cursor: pointer;
        }
    }
}
</style>