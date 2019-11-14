<template>
	<div class="timebox">
		{{time|moment}}
	</div>
</template>
<script>
import { setInterval } from 'timers';
export default {
  data () {
    return {
      time: new Date()
    }
  },
  mounted(){
    this.settime()
  },

  methods:{
    settime(){
      this.time = new Date()
      setInterval(this.settime,1000)
      this.clear()
    },
    clear(){
      clearInterval(this.settime)
      this.settime = null;
    }
  }
}
</script>
