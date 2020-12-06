<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 2000) {
        //console.log('ggg')
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
    // props: {
    //   message: {
    //     type: String,
    //     default:''
    //   },
    //   isShow: {
    //     type: Boolean,
    //     default: false
    //   }
    // }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    color: #fff;
    padding: 8px 10px;
    transform: translate(-50%, 60%);
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
  }

</style>
