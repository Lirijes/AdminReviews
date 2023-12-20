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

const randomReviews = computed(() => {
    const reviewsToUse = searchResults.value.length > 0 ? searchResults.value : items;
  const shuffledReviews = reviewsToUse.slice().sort(() => Math.random() - 0.5);
  const selectedReviews = shuffledReviews.slice(0, 2);
  return selectedReviews;
});
</script>

<template>
    <div class="sidemenu">
        <div class="sidemenu__container" :class="{ 'sidemenu__container--closed': !showWholeMenu }">
            <div v-if="showWholeMenu" class="sidemenu__container-open-menu">
                <div class="sidemenu__container-open-menu-header">
                    <button class="sidemenu-btn" @click="toggleMenu"><font-awesome-icon :icon="['fas', 'angles-left']" /></button>
                    <h2 class="sidemenu__container-open-menu-header-title"></h2>
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
                <div class="sidemenu__container-open-menu-review">
                    <div class="sidemenu__container-open-menu-review-header">
                        <h5>New reviews</h5>
                        <NuxtLink to="/" class="sidemenu__container-open-menu-review-header-showall">show all ></Nuxtlink>
                    </div>
                    <div v-for="review in randomReviews" :key="review.id" class="sidemenu__container-open-menu-categories-larg-preview">
                        <div class="preview-card">
                            <h5>{{ review.name }}</h5>
                            <p>{{ review.comment }}</p>
                            <!-- Add other review details as needed -->
                        </div>
                    </div>
                </div>
                <div class="sidemenu__container-open-menu-review">
                    <div class="sidemenu__container-open-menu-review-header">
                        <h5>Published reviews</h5>
                        <NuxtLink to="/" class="sidemenu__container-open-menu-review-header-showall">show all ></Nuxtlink>
                    </div>
                </div>
                <div  class="sidemenu__container-open-menu-review">
                    <div class="sidemenu__container-open-menu-review-header">
                        <h5>Unpublished reviews</h5>
                        <NuxtLink to="/" class="sidemenu__container-open-menu-review-header-showall">show all ></Nuxtlink>
                    </div>
                </div>
            </div>
            <!-- closed menu -->
            <div v-if="!showWholeMenu" class="sidemenu__container-closed-menu">
                <button class="sidemenu-btn" @click="toggleMenu"><font-awesome-icon :icon="['fas', 'angles-right']" /></button>
                <div class="sidemenu__container-closed-menu-icons">
                    <font-awesome-icon 
                        class="sidemenu__container-closed-menu-search-icon" 
                        :icon="['fas', 'magnifying-glass']"  
                        @click="handleSearch" 
                    />
                    <font-awesome-icon 
                        class="font-awesome-icon" 
                        :icon="['fas', 'xmark']" 
                    />
                    <font-awesome-icon 
                        :icon="['fas', 'check']" 
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
    width: 300px;

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

            &-review {
                display: flex;
                flex-direction: column;
                margin: 15px 0;

                &-header {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin-bottom: 2px;

                    &-showall {
                        font-size: 12px;
                    }
                }
            }

            &-categories {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin: 15px 0;
                
                &-larg-preview {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100px;
                    border: 1px solid $color-cloud-gray;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                &-link {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 40px;
                    border: 1px solid $color-cloud-gray;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    &-content {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        width: 100%;
                        height: 100%;
                    }
                }
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