<template>
  <div class="manager-left-wrap">
    <ul>
      <li
        :class="active == 'lesson' ? 'is-active' : ''"
        @click="handleChange('lesson')"
      >
        金课收藏
      </li>
      <li
        :class="active == 'course' ? 'is-active' : ''"
        @click="handleChange('course')"
      >
        金课程收藏
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="less" scoped>
.manager-left-wrap {
  ul {
    padding: 0;
    height: 100%;
    list-style: none;
    background-color: @color-bgc-gray0;
  }
  li {
    margin-bottom: 4px;
    padding-left: 35px;
    width: 130px;
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    letter-spacing: 3px;
    cursor: pointer;
  }
  .is-active {
    border-left: 2px solid @color-primary;
    color: @color-primary;
    background-color: @color-bgc-primary-light;
  }
  li:hover {
    color: @color-primary;
  }
}
</style>
