<template>
  <div class="subtitle-item-wrap">

    <div class="subtitle-item-tip">------{{ index }}/{{ total }}------</div>
    <div class="subtitle-item-content" :class="isActive ? 'subtitle-item-active' : ''">
      <div v-if="canEdit" v-loading="loading">
        <el-input
          v-if="isEditing"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="newText"
          @blur="handleBlurSubtitle"
        ></el-input>
        <span v-else @click="isEditing = true">
          {{ showText }}
          <i class="el-icon-edit"></i>
        </span>
      </div>
      <span v-else>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        index: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        text: {
            type: String,
            default: ''
        },
        isActive: {
            type: Boolean,
            default: false
        },
        subtitleId: {
            type: String,
            default: ''
        },
        canEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isEditing: false,
            showText: this.text,
            newText: this.text,
            loading: false
        }
    },
    methods: {
        ...mapActions('lesson', ['updateSubtitle']),
        handleBlurSubtitle() {
            this.loading = true
            this.updateSubtitle({
                id: this.subtitleId,
                content: this.newText
            })
                .then(res => {
                    // console.log(res)
                    if (res.code === 0) {
                        this.showText = this.newText
                    } else {
                        this.showText = '编辑失败，请重试！'
                    }
                })
                .then(() => {
                    this.loading = false
                    this.isEditing = false
                })
        }
    }
}
</script>

<style lang="less" scoped>
.subtitle-item-tip {
    line-height: 40px;
    text-align: center;
    color: @color-primary;
}
.subtitle-item-content {
    padding: 0 10px;
    line-height: 25px;
    text-indent: 2em;
    .el-textarea {
        display: block;
    }
}
.subtitle-item-active {
    color: @color-primary;
}
</style>
