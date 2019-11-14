<template>
  <div class="manager-left-wrap">
    <ul>
      <li :class="active == 'published' ? 'is-active' : ''" @click="handleChange('published')">已发布</li>
      <li
        :class="active == 'unpublished' ? 'is-active' : ''"
        @click="handleChange('unpublished')"
      >未发布</li>
      <li :class="active == 'upload' ? 'is-active' : ''" @click="handleChange('upload')">
        <span v-if="type == 'lesson'">创建课堂资源</span>
        <span v-else>创建课程资源</span>
      </li>

      <li class="manager-search" v-show="type == 'lesson'">
        <el-input v-model="searchText" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </li>
      <li class="recycle">
        <el-button class="tr-row-button el-icon-delete-solid" @click="handleRecycle">回收站</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            searchText: ''
        }
    },
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
        },
        handleRecycle() {
            let path = `/mine/${this.type}/recycle`
            this.$router.push({
                path,
                query: {
                    active:this.active,
                    from: 'mine-lesson-manager'
                }
            })
        },
        handleSearch() {
            //console.log(this.searchText, this.active)
            this.$router.push({
                path: '/mine/lesson/search',
                query: {
                    word: this.searchText,
                    active: this.active,
                    from: 'mine-lesson-manager'
                }
            })
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
        overflow: hidden;
        margin: 10px 0;
    }
    li {
        padding: 0 35px;
        height: 60px;
        line-height: 60px;
        font-size: 15px;
        letter-spacing: 3px;
        cursor: pointer;
        float: left;
    }
    .is-active {
        color: @color-primary;
        background-color: @color-bgc-primary-light;
    }
    li:hover {
        color: @color-primary;
    }
    li.manager-search {
        float: right;
        padding: 0 0;
        margin-left: 10px;
    }
    li.recycle {
        float: right;
        padding: 0;
    }
}
</style>
