<template>
  <div class="result-header">
    <span v-if="count > 0">为您找到“{{ text }}”相关的内容共计{{ count }}个</span>
    <span v-else>未找到“{{ text }}”相关的内容</span>
    <div class="result-sort">
      <span>排 序:</span>
      <div class="search-sort">
        <el-radio-group v-model="activeName" size="mini">
          <el-radio-button label="new"><span @click="handleSort('new')">最新</span></el-radio-button>
          <el-radio-button label="hot"><span @click="handleSort('broadcast')">最热</span></el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'new'
        }
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleSort(e) {
            //console.log(e)
            const retsort = 'sort=' + e
            this.$emit('set-option', { sort: retsort })
        }
    }
}
</script>

<style lang="less" scoped>
.result-header {
    margin-top: 15px;
    padding-left: 20px;
    line-height: 50px;
    background: @color-bgc-gray;
    .result-sort {
        float: right;
        margin-right: 10px;
        span {
            margin: 0 5px;
            padding: 5px 10px;
        }
        .search-sort {
            float: right;

            .active-sort {
                color: @color-primary;
                background-color: @color-bgc-green;
            }
        }
    }
}
</style>
