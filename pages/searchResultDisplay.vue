<script setup>
const { searchResults } = useSearch();

// move this out to a composable
const toggleReviewPublicationStatus = (id) => {
  const review = searchResults.value.find((r) => r.id === id);
  if (review) {
    review.published = !review.published;
  }
};
</script>

<template>
  <div class="searchResultDisplay">
    <div class="searchResultDisplay__container">
      <h4>Search Results</h4>
      <p>Displaying results for: {{ $route.query.q }}</p>
      <ul>
        <Review
          v-for="result in searchResults"
          :key="result.id"
          :result="result"
          :toggleReviewPublicationStatus="toggleReviewPublicationStatus"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchResultDisplay {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    height: 100%;
  }
}

.published {
  color: green;
}

.unpublished {
  color: red;
}
</style>
