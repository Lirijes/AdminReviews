// useSearch.ts
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { type ReviewV2, getReviews } from '~/utils/mockReviews';

export const useSearch = () => {
  const router = useRouter();
  const searchResults = ref<ReviewV2[]>([]);
  const searchTerm = ref<string | null>(null);

  const fetchSearchResults = async (searchTerm: string | null) => {
    if (searchTerm !== null) {
        const reviews: ReviewV2[] = getReviews();
  
        // Filter reviews based on the search term
        searchResults.value = reviews.filter(
          (review) =>
            (typeof review.author.name === 'string' && review.author.name.toLowerCase().includes(searchTerm)) ||
            (typeof review.content === 'string' && review.content.toLowerCase().includes(searchTerm)) ||
            (typeof review.title === 'string' && review.title.toLowerCase().includes(searchTerm)) ||
            (typeof review.createdAt === 'object' && review.createdAt.toString().toLowerCase().includes(searchTerm)) ||
            (typeof review.item.name === 'string' && review.item.name.toLowerCase().includes(searchTerm)) ||
            (typeof review.published === 'boolean' && review.published.toString().toLowerCase() === searchTerm)
        );
    }
  };

  onMounted(() => {
    // Fetch search results based on $route.query.q
    const query = router.currentRoute.value.query.q;
    searchTerm.value = Array.isArray(query) ? query[0] : query;
    const searchString = searchTerm.value ?? '';

    // Fetch search results
    fetchSearchResults(searchString);
  });

  // Watch for changes in searchTerm and update search results accordingly
  watch(searchTerm, (newSearchTerm) => {
    // Fetch search results when searchTerm changes
    fetchSearchResults(newSearchTerm);
  });

  return {
    searchResults,
    searchTerm,
    fetchSearchResults,
  };
};