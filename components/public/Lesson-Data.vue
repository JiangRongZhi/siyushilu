<template>
  <div class="public-lesson-data">
    <span :style="{ fontSize: size + 'px' }">
      <Icon file="collection" :size="size" />
      {{ collection }}
    </span>
    <span :style="{ fontSize: size + 'px' }">
      <Icon file="like" :size="size" />
      {{ like }}
    </span>
    <span :style="{ fontSize: size + 'px' }">
      <Icon file="comment" :size="size" />
      {{ comment }}
    </span>
  </div>
</template>

<script>
import Icon from '@/components/public/Icon.vue'
export default {
  components: {
    Icon
  },
  props: {
    collection: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    comment: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 16
    }
  }
}
</script>

<style>
.public-lesson-data {
  display: inline-block;
}
.public-lesson-data span {
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  color: @color-text;
}
.public-lesson-data i {
  margin-right: 3px;
}
</style>
