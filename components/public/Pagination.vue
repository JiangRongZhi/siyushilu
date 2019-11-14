<template>
  <el-pagination
    :current-page="page"
    :page-size="size"
    :total="total"
    background
    layout="prev, pager, next, total, jumper"
    prev-text="上一页"
    next-text="下一页"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="less">
.el-pagination {
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: @color-bgc-white;
  border: 1px solid @color-border-gray;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev {
  padding-left: 8px;
  padding-right: 8px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: @color-primary;
  border: none;
}
</style>
