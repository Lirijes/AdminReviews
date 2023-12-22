<script setup lang="ts">
const { searchResults } = useSearch();
</script>

<template>
  <div class="searchResultDisplay">
    <div class="searchResultDisplay__container">
        <h4>Search Results</h4>
        <p>Displaying results for: {{ $route.query.q }}</p>
        <ul>
        <li v-for="result in searchResults" :key="result.id">
            {{ result.author.name }} - ID: {{ result.id }} - Title:
            {{ result.title }} - Comment: {{ result.content }}
        </li>
        </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchResultDisplay {

  &__container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 20px;
    height: 100%;
  }
}
</style>
