<script setup lang="ts">
import type { Item, ReviewV2 } from "@/utils/mockReviews";

const props = defineProps({
  review: {
    type: Object as PropType<ReviewV2>,
    required: true,
  },
});

const truncateContent = (content: string | Record<string, unknown>) => {
  const actualContent: string =
    typeof content === 'string'
      ? content
      : typeof content === 'object'
      ? (content['sv'] as string) || JSON.stringify(content)
      : '';

  const maxCharacters = 100;
  return actualContent.length > maxCharacters ? `${actualContent.slice(0, maxCharacters)}...` : actualContent;
};
</script>

<template>
  <div class="preview-card">
    <div class="preview-card__header">
      <h5 class="dark-text">{{ review.author.name }}</h5>
      <p class="dark-text">date</p>
      <p class="preview-card__header-content dark-text">{{ truncateContent(review.content) }}</p>
    </div>
    <div
      class="preview-card__img"
      v-if="review.imageUrls && review.imageUrls.length > 0"
    >
      <img
        v-for="(imageUrl, index) in review.imageUrls"
        :key="index"
        :src="imageUrl"
        alt="Item Picture"
        class="review-item-picture"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/style/index.scss";

.preview-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__header {
    margin-left: 5px;

    &-content {
      margin-top: 10px;
    }
  }

  &__img {
    .review-item-picture {
      width: 100px;
      height: 100px;
      border: 1px solid transparent;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
