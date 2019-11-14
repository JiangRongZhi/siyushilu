<template>
  <div>制作中</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 1,
      limit: 2,
      ids: [],
      loading: false
    }
  },
  methods: {
    emit() {
      this.$emit('input', this.ids)
    }
  }
}
</script>
