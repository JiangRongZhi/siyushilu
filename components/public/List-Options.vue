<template>
  <div class="list-options-wrap">
    <div class="course-options">
      <div class="options-year">
        <span class="options-label">年 度：</span>
        <el-radio-group v-model="options.year" @change="handleYearChange">
          <el-radio label="">全部</el-radio>
          <el-radio
            v-for="(item, index) in years"
            :key="index"
            :label="item.id"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="options-sort">
        <span class="options-label">排 序：</span>
        <el-radio-group v-model="options.sort_action">
          <el-radio label="new">
            <span @click="handleSort('new')">
              最新
              <i class="el-icon--right" :class="setIcon(options.new)"></i>
            </span>
          </el-radio>
          <el-radio label="broadcast">
            <span @click="handleSort('broadcast')">
              最热
              <i class="el-icon--right" :class="setIcon(options.broadcast)"></i>
            </span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      options: {
        year: '',
        sort_action: 'new',
        new: true,
        broadcast: true,
        likes: true,
        comment: true
      },
      sort: [],
      years: []
    }
  },
  mounted() {
    this.getYearList().then(res => {
      this.years = res
    })
  },
  methods: {
    ...mapActions('lesson', ['getYearList']),
    setIcon(b) {
      return 'el-icon-sort-down'
    },
    handleSort(e) {
      // 改变属性
      this.options[e] = !this.options[e]
      // 排序
      const sort = this.sort
      const i = sort.indexOf(e)
      if (i >= 0) {
        sort.splice(i, 1)
      }
      sort.push(e)
      // 拼接
      const sortString = []
      for (let i = 0, l = sort.length; i < l; i++) {
        const label = sort[i]
        sortString.push(
          'sort' + label + '=' + (this.options[label] ? 'up' : 'down')
        )
      }

      const retsort = 'sort=' + e
      //console.log(retsort);

      // console.log(e, sort, sortString.join('&'))
      this.$emit('set-option', { sort: retsort })
    },
    handleYearChange(e) {
      this.$emit('set-option', { year: this.options.year })
    }
  }
}
</script>

<style lang="less">
.list-options-wrap {
  line-height: 42px;
  background-color: @color-bgc-gray;
  border: 1px solid @color-border-gray1;
  .options-label {
    display: inline-block;
    padding-left: 10px;
    width: 80px;
    font-size: 16px;
    text-align: center;
  }
  .el-radio {
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
  }
  .is-checked {
    background-color: @color-bgc-green;
  }
  .is-checked + .el-radio__label {
    color: @color-primary;
  }
}
.options-sort,
.options-year {
  .el-radio__inner {
    display: none;
  }
}
/*
.course-options {
  padding: 20px;
}
.options-sort {
  padding-top: 10px;
}
*/
</style>
