<script setup lang="ts">
import { useSearch } from '~/composables/useSearch';

const { searchResults, searchTerm, fetchSearchResults } = useSearch();

watch(searchTerm, (newSearchTerm) => {
  fetchSearchResults(newSearchTerm ?? '');
});
</script>

<template>
    <div>
      <h1>Search Results</h1>
      <p>Displaying results for: {{ $route.query.q }}</p>
      <ul>
        <li v-for="result in searchResults" :key="result.id">
            {{ result.author.name }} - ID: {{ result.id }} - Title: {{ result.title }} - Comment: {{ result.content }}
        </li>
      </ul>
    </div>
  </template>
  
