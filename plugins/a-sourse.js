import Vue from 'vue'
import ARow from '@/components/a-source/a-row.vue'
import ACol from '@/components/a-source/a-col.vue'

export default () => {
  Vue.component('a-row', ARow)
  Vue.component('a-col', ACol)
}
