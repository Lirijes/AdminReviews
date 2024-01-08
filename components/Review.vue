<script setup lang="ts">
const props = defineProps(['result']);
const isPublished = ref(props.result.published);

const togglePublicationStatus = () => {
    isPublished.value = !isPublished.value;
  props.result.published = isPublished.value;
};

const formatContent = (content: string | Record<string, unknown>) => {
  if (typeof content === 'object') {
    return (content['sv'] as string) || JSON.stringify(content);
  }

  return content as string;
};
</script>

<template>
    <div class="review">
        <li class="review__list">
            <div class="review__list-author">
                <div class="review__list-author-name">
                    <h5>{{ result.author.name }}</h5>
                    <p class="p-review"> {{ result.author.email }}</p>
                    <p class="p-review">{{ result.createdAt }}</p>
                </div>
                <p class="p-review">ID: {{ result.id }}</p>
            </div>
            <div class="review__list-content">
                <h6>Review content:</h6>
                <p class="p-review">{{ formatContent(result.title) }}</p>
                <p class="p-review">Comment: {{ formatContent(result.content) }}</p>
            </div> 
            <div class="review__list-product">
                <h6>Item info:</h6>
                <div class="review__list-product-content">
                    <div class="review__list-product-info">
                        <p class="p-review"> {{ result.item.name }}</p>
                        <p class="p-review">Köpt storlek: {{ result.item.size }}</p>
                    </div>
                    <template class="review__list-product-img" v-if="result.imageUrls && result.imageUrls.length > 0">
                        <img
                            v-for="(imageUrl, index) in result.imageUrls"
                            :key="index"
                            :src="imageUrl"
                            alt="Item Picture"
                            class="review-item-picture"
                        />
                    </template>
                    <p v-else class="p-review">No item picture available.</p>
                </div>
            </div>
            <div class="review__list-changes">
                <div class="review__list-changes-published">
                <span>
                    <p class="p-review">Published:</p>
                    <span :class="{'green-text': result.published, 'red-text': !result.published}">
                        <p class="p-review">{{ result.published ? "Yes" : "No" }}</p>
                    </span>
                </span>
                    <button class="all-around-btn" @click="togglePublicationStatus">
                        <p class="p-review">{{ result.published ? "Unpublish" : "Publish" }}</p>
                    </button>
                </div>
                <button class="all-around-btn">
                    Make Changes
                </button>
            </div>
        </li>
    </div>
</template>

<style scoped lang="scss">
.review {
    margin-bottom: 20px;

    @media  screen and (min-width: 370px ) and (max-width: 505px) {
        width: 82%;
    }
    
    &__list {
        padding: 20px;
        height: 100%;
        border: 1px solid $color-hurricane-gray;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        &:last-child .review__list-changes {
            align-items: center;
            text-align: center;
        }

        &-author {
            font-size: 20px;
            padding: 5px;
            border-bottom: 1px solid $color-hurricane-gray;
            display: flex;
            flex-direction: column;
        }

        &-content {
            display: flex;
            flex-direction: column;
            padding: 5px;
            border-bottom: 1px solid $color-hurricane-gray;
        }

        &-product {
            padding: 5px;
            border-bottom: 1px solid $color-hurricane-gray;

            &-content {
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: space-between;

                @media screen and (min-width: 505px) {
                    display: flex;
                    flex-direction: row;
                    align-items: start;
                    justify-content: space-between;
                }
            }

            .review-item-picture {
                width: 100px;
                height: 100px;
                border: 1px solid $color-cloud-gray;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin-right: 10px;
            }
        }

        &-changes {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            padding: 10px;
            height: 100%;

            &-published {
                display: flex;
                flex-direction: column;
            }
        }
    }
}

.green-text {
  color: green;
}

.red-text {
  color: red;
}
</style>
