<script>
export default {
  props: {
    result: Object,
    toggleReviewPublicationStatus: Function,
  },
  methods: {
    togglePublicationStatus() {
      this.toggleReviewPublicationStatus(this.result.id);
    },
  },
};
</script>

<template>
    <div class="review">
        <li class="review__list">
            <div class="review__list-author">
                <h6>{{ result.author.name }}</h6>
                <p class="p-review">ID: {{ result.id }}</p>
            </div>
            <div class="review__list-content">
                <p class="p-review">Title: {{ result.title }}</p>
                <p class="p-review">Comment: {{ result.content }}</p>
            </div> 
            <div class="review__list-changes">
                <div class="review__list-changes-published">
                <span>
                    Published: 
                    <span :class="{'green-text': result.published, 'red-text': !result.published}">
                        {{ result.published ? "Yes" : "No" }}
                    </span>
                </span>
                    <button class="all-around-btn" @click="togglePublicationStatus">
                        {{ result.published ? "Unpublish" : "Publish" }}
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
    &__list {
        // display: flex;
        // flex-direction: column;
        padding: 20px;
        height: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        &:last-child .review__list-changes {
            align-items: center;
            text-align: center;
        }

        &-author {
            font-size: 20px;
            padding: 5px;
            border-bottom: 1px solid $color-cloud-gray;
            display: flex;
            flex-direction: column;
        }

        &-content {
            display: flex;
            flex-direction: column;
            padding: 5px;
            border-bottom: 1px solid $color-cloud-gray;
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
