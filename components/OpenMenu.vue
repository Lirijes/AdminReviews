<script setup lang="ts">
import type { Item, ReviewV2 } from '@/utils/mockReviews';

const props = defineProps<{ 
  modelValue: any;
  toggleMenu: () => void;
  showWholeMenu: boolean; 
}>();
const emit = defineEmits(["update:modelValue"]);
const reviews = ref<ReviewV2[]>(getReviews());
const filterMode = ref(false);
const router = useRouter();
const { searchResults, searchTerm, fetchSearchResults } = useSearch();
const filterOptions: { [key: string]: boolean } = {};
const reviewV2Properties: (keyof ReviewV2)[] = ['createdAt', 'imageUrls', 'published', 'language', 'item'];
const itemProperties: (keyof Item)[] = ['colorName', 'color', 'baseProduct', 'type', 'size', 'mainColor', 'name'];

// Object to store range-based filter options
const rangeFilters: { [key: string]: { min: number | null; max: number | null } } = {
  createdAt: { min: null, max: null },
};

//do something else with this? need to get all the properties of the product to filter on
reviewV2Properties.forEach((property) => {
  filterOptions[property as string] = false;
});
itemProperties.forEach((property) => {
  filterOptions[property as string] = false;
});

const handleSearch = async () => {
  const searchString = props.modelValue.toLowerCase();
  await fetchSearchResults(searchString);

  if (searchResults.value.length > 0) {
    searchTerm.value = searchString;
    router.push({ name: "searchResultDisplay", query: { q: searchString } });
  }
};

//Update sidemenu content when pressing filter button
const toggleFilterMode = () => {
  filterMode.value = !filterMode.value;
};

const applyFilters = () => {
  console.log('Range Filters:', rangeFilters);
  // Switch back to review mode
  filterMode.value = false;
};

const cancelFilterMode = () => {
  // Reset filter options and range filters and switch back to review mode
  Object.keys(filterOptions).forEach((key) => {
    filterOptions[key] = false;
  });
  Object.keys(rangeFilters).forEach((key) => {
    rangeFilters[key].min = null;
    rangeFilters[key].max = null;
  });
  filterMode.value = false;
};

const randomReviews = computed(() => {
  const shuffledReviews = reviews.value.slice().sort(() => Math.random() - 0.5);
  const selectedReviews = shuffledReviews.slice(0, 2);
  return selectedReviews;
});
</script>

<template>
    <div v-if="showWholeMenu" class="open-menu">
        <div class="open-menu__header">
          <button class="light-background-btn" @click="props.toggleMenu">
            <font-awesome-icon :icon="['fas', 'angles-left']" />
          </button>
          <h2 class="open-menu__header-title"></h2>
        </div>
        <div class="open-menu__searchandfilter">
          <div class="open-menu__searchandfilter-search">
            <input
              type="search"
              :value="props.modelValue"
              @input="
                (e) =>
                  emit(
                    'update:modelValue',
                    (e.target as HTMLInputElement).value
                  )
              "
              @keyup.enter="handleSearch"
              placeholder="search.."
            />
          </div>
          <div class="open-menu__searchandfilter-filter">
            <button class="light-background-btn" @click="toggleFilterMode">
              <font-awesome-icon
                :icon="['fas', 'bars-staggered']"
              />
            </button>
          </div>
        </div>
        <div v-if="filterMode" class="open-menu__filteroptions">
          <div class="filter-options">
            <label v-for="(value, key) in filterOptions" :key="key">
              <input v-model="filterOptions[key]" type="checkbox" /> {{ key }}
            </label>
            <label v-for="(range, key) in rangeFilters" :key="key">
              {{ key }}:
              <input v-model="range.min" type="number" placeholder="Min" />
              <input v-model="range.max" type="number" placeholder="Max" />
            </label>
              <button class="black-background-textbtn" @click="applyFilters">Apply Filters</button>
              <button class="black-background-textbtn" @click="cancelFilterMode">Cancel</button>
          </div>
        </div>
        <div v-if="!filterMode">
          <div class="open-menu__review">
            <div class="open-menu__review-header">
              <h5>New reviews</h5>
              <NuxtLink
                to="/"
                class="open-menu__review-header-showall"
                >show all ></NuxtLink
              >
            </div>
            <div v-if="randomReviews.length > 0">
              <div
                v-for="review in randomReviews"
                :key="review.id"
                class="open-menu__review-larg-preview"
              >
                <PreviewReview :review="review" />
              </div>
            </div>
          </div>
          <div class="open-menu__category">
            <div class="open-menu__category-content">
              <h5>Published reviews</h5>
              <NuxtLink
                to="/"
                class="open-menu__category-content-showall"
                >show all ></NuxtLink
              >
            </div>
          </div>
          <div class="open-menu__category">
            <div class="open-menu__category-content">
              <h5>Unpublished reviews</h5>
              <NuxtLink
                to="/"
                class="open-menu__category-content-showall"
                >show all ></NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped lang="scss">
@import "./assets/style/index.scss";

.open-menu {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    justify-content: start;

    &-title {
      font-size: 24px;
    }
  }

  &__searchandfilter {
    display: flex;
    align-items: center;
    margin: 15px 0;

    @media screen and (min-width: 576px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
    }

    &-search {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      margin: 10px 0;
    }

    &-filter {
      background-color: $color-active-gray;
      border-radius: 20px;
      margin-left: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  &__filteroptions {
    display: flex;
    flex-direction: column;

    .filter-options {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: $color-smooth-gray;
      border-radius: 20px;
    }

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

  &__review {
    display: flex;
    flex-direction: column;
    margin: 15px 0;

    &-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 2px;
      color: white;

      &-showall {
        font-size: 12px;
      }
    }

    &-larg-preview {
      display: flex;
      //align-items: center;
      justify-content: center;
      width: 100%;
      height: 100px;
      background-color: $color-wild-sand;
      border: 1px solid $color-cloud-gray;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__category {
    display: flex;
    flex-direction: column;
    margin: 15px 0;

    &-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 2px;
      color: white;

      &-showall {
        font-size: 12px;
      }
    }
  }
}
</style>