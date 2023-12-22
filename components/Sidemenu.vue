<script setup lang="ts">
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["update:modelValue"]);
const reviews = ref<ReviewV2[]>(getReviews());
const showWholeMenu = ref(true);
const route = useRoute();
const router = useRouter();
const { searchResults, searchTerm, fetchSearchResults } = useSearch();

const handleSearch = async () => {
  const searchString = props.modelValue.toLowerCase();
  await fetchSearchResults(searchString);

  if (searchResults.value.length > 0) {
    searchTerm.value = searchString;
    router.push({ name: 'searchResultDisplay', query: { q: searchString } });
  }
}

function toggleMenu() {
  showWholeMenu.value = !showWholeMenu.value;
}

const randomReviews = computed(() => {
  //const reviewsToUse = searchResults.value.length > 0 ? searchResults.value : items; //this is making the searched item to show in random reviews aswell
  //const shuffledReviews = reviewsToUse.slice().sort(() => Math.random() - 0.5); // same as above
  const shuffledReviews = reviews.value.slice().sort(() => Math.random() - 0.5);
  const selectedReviews = shuffledReviews.slice(0, 2);
  return selectedReviews;
});
</script>

<template>
  <div class="sidemenu">
    <div
      class="sidemenu__container"
      :class="{ 'sidemenu__container--closed': !showWholeMenu }"
    >
      <div v-if="showWholeMenu" class="sidemenu__container-open-menu">
        <div class="sidemenu__container-open-menu-header">
          <button class="sidemenu-btn" @click="toggleMenu">
            <font-awesome-icon :icon="['fas', 'angles-left']" />
          </button>
          <h2 class="sidemenu__container-open-menu-header-title"></h2>
        </div>
        <div class="sidemenu__container-open-menu-searchandfilter">
            <div class="sidemenu__container-open-menu-searchandfilter-search">
                <input
                    class="sidemenu__container-open-menu-searchandfilter-search-input"
                    type="search"
                    :value="props.modelValue"
                    @input="
                    (e) =>
                        emit('update:modelValue', (e.target as HTMLInputElement).value)
                    "
                    @keyup.enter="handleSearch"
                    placeholder="search.."
                />
            </div>
            <div class="sidemenu__container-open-menu-searchandfilter-filter">
                <button class="sidemenu-btn" @click="handleSearch">
                    <font-awesome-icon class="open-menu-filtet-icon" :icon="['fas', 'bars-staggered']" />
                </button>
            </div>
        </div>
        <!-- <div class="sidemenu__container-open-menu-search">
          <input
            class="sidemenu__container-open-menu-search-input"
            type="search"
            :value="props.modelValue"
            @input="
              (e) =>
                emit('update:modelValue', (e.target as HTMLInputElement).value)
            "
            @keyup.enter="handleSearch"
            placeholder="search.."
          />
        </div> -->
        <div class="sidemenu__container-open-menu-review">
          <div class="sidemenu__container-open-menu-review-header">
            <h5>New reviews</h5>
            <NuxtLink
              to="/"
              class="sidemenu__container-open-menu-review-header-showall"
              >show all ></NuxtLink
            >
          </div>
          <div v-if="randomReviews.length > 0">
            <div
              v-for="review in randomReviews"
              :key="review.id"
              class="sidemenu__container-open-menu-review-larg-preview"
            >
              <div class="preview-card">
                <h5>{{ review.author.name }}</h5>
                <p>{{ review.content }}</p>
                <!-- Add other review details as needed -->
              </div>
            </div>
          </div>
        </div>
        <div class="sidemenu__container-open-menu-category">
          <div class="sidemenu__container-open-menu-category-content">
            <h5>Published reviews</h5>
            <NuxtLink
              to="/"
              class="sidemenu__container-open-menu-category-content-showall"
              >show all ></NuxtLink
            >
          </div>
        </div>
        <div class="sidemenu__container-open-menu-category">
          <div class="sidemenu__container-open-menu-category-content">
            <h5>Unpublished reviews</h5>
            <NuxtLink
              to="/"
              class="sidemenu__container-open-menu-category-content-showall"
              >show all ></NuxtLink
            >
          </div>
        </div>
      </div>
      <!-- closed menu -->
      <div v-if="!showWholeMenu" class="sidemenu__container-closed-menu">
        <button class="sidemenu-btn" @click="toggleMenu">
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
        <div class="sidemenu__container-closed-menu-icons">
          <NuxtLink to="/">
            <font-awesome-icon
              class="closed-menu-icon"
              :icon="['fas', 'magnifying-glass']"
              @click="handleSearch"
            />
          </NuxtLink>
          <NuxtLink to="/">
            <font-awesome-icon
              class="closed-menu-icon"
              :icon="['fas', 'check']"
            />
          </NuxtLink>
          <NuxtLink to="/">
            <font-awesome-icon
              class="closed-menu-icon"
              :icon="['fas', 'xmark']"
            />
          </NuxtLink>
        </div>
      </div>
      <!-- need to move this eventually to a new page -->
      <!-- <p v-if="searchResults.length === 0">No reviews were found.</p>
            <ul v-if="searchResults.length > 0">
                <li v-for="result in searchResults" :key="result.id">{{ result.author.name }} - ID: {{ result.id }} - Title: {{ result.title }} - Comment: {{ result.content }}</li>
            </ul> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/style/index.scss";

.sidemenu {
  position: relative;
  min-height: 100vh;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 300px; 
  }

  &__container {
    border-radius: 20px;
    border: 1px solid $color-cloud-gray;
    padding: 20px;
    height: 100%;
    box-sizing: content-box;
    height: 100vh;

    &--closed {
      width: 20px;
    }

    &-open-menu {
      display: flex;
      flex-direction: column;

      &-header {
        display: flex;
        align-items: center;
        justify-content: start;

        &-title {
          font-size: 24px;
        }
      }

      &-searchandfilter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;

        &-search {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px 0;
        }

        &-filter {
            background-color: $color-active-gray;
            border-radius: 20px;
            margin-left: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
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
      }

      &-category {
        display: flex;
        flex-direction: column;
        margin: 15px 0;

        &-content {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 2px;

          &-showall {
            font-size: 12px;
          }
        }
      }
    }

    &-closed-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      cursor: pointer;

      &-icons {
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
  }
}
</style>
