<template>
  <div class="course-item-wrap">
    <el-image class="course-item-image" :src="data.coverImage ? data.coverImage:'' "></el-image>
    <div class="c-count">共{{ data.lessonNum || 0 }}个</div>
    <div class="c-title">
      <span class="c-name">{{ data.name }}</span>
      <span class="c-techer">{{ data.teacherName }}</span>
    </div>
    <div class="c-major">所属专业：{{data.professionName}}</div>
    <div class="c-date" v-if="data.createTime">创建时间：{{ data.createTime | filterDate('yyyy-MM-dd hh:mm') }}</div>
    <div class="c-date" v-else-if="data.publishTime">发布时间：{{ data.publishTime | filterDate('yyyy-MM-dd hh:mm') }}</div>
    <div class="c-date" v-else>更新时间：{{ data.updateTime | filterDate('yyyy-MM-dd hh:mm') }}</div>
    <div class="c-major">浏览量：{{ data.broadcast }}</div>
  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.course-item-wrap {
    position: relative;
    height: 255px;
    background-color: @color-bgc-gray;
    margin-bottom: 10px;
    .c-count {
        position: absolute;
        padding: 3px 8px;
        top: 115px;
        right: 10px;
        font-size: 14px;
        border-radius: 5px;
        color: @color-white;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .c-title {
        padding: 0 5px;
        line-height: 25px;
        font-size: 15px;
        .c-name {
            display: inline-block;
            width: 105px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: top;
        }
    }
    .c-major {
        padding: 10px 5px;
        font-size: 12px;
    }
    .c-date {
        padding: 0 5px;
        font-size: 12px;
    }
}
.course-item-image {
    width: 100%;
    height: 150px;
}
</style>
