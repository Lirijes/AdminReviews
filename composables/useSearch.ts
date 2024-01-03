export const useSearch = () => {
  const route = useRoute();
  const router = useRouter();
  const searchResults = ref<ReviewV2[]>([]);
  const searchTerm = ref<string | null>(null);

  const fetchSearchResults = async (searchTerm: string | null) => {
    if (searchTerm !== null) {
      const reviews: ReviewV2[] = getReviews();

      // Filter reviews based on the search term
      //working: author name, item name
      //not working: content (formatting?), title (formatting?), createdAt and published (not if i search 2023-09-27 for example), am i searching for createdAt or published?
      searchResults.value = reviews.filter(
        (review) =>
          (typeof review.author.name === "string" &&
            review.author.name.toLowerCase().includes(searchTerm)) ||
          (typeof review.author.email === "string" &&
            review.author.email.toLowerCase().includes(searchTerm)) ||
          (typeof review.content === "string" &&
            review.content.toLowerCase().includes(searchTerm)) ||
          (typeof review.title === "string" &&
            review.title.toLowerCase().includes(searchTerm)) ||
          (typeof review.createdAt === "object" &&
            review.createdAt.toString().toLowerCase().includes(searchTerm)) ||
          (typeof review.item.name === "string" &&
            review.item.name.toLowerCase().includes(searchTerm)) ||
          (typeof review.published === "boolean" &&
            review.published.toString().toLowerCase() === searchTerm)
      );

      //route.query.q = searchTerm;
      await router.push({ query: { q: searchTerm } });
    }
  };

  // Mimic onBeforeMount behavior
  watchEffect(() => {
    // Fetch search results based on $route.query.q
    const query = route.query.q;
    searchTerm.value = Array.isArray(query) ? query[0] : query;
    const searchString = searchTerm.value ?? "";

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
