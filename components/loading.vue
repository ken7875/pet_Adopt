<template>
  <div v-if="loading" class="loading-page">
    <div class="spinner">
      <div />
      <div />
    </div>
    <p class="text-lg-xl">
      loading...
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #F2BE58;
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 10000;
  p{
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-37%, -50%);
  }
  .spinner{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate((-50%, -50%));
    width: 120px;
    height: 120px;
  }
  .spinner div {
    animation: loader 1.2s linear infinite;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 8px solid transparent;
    border-top-color: $primary;
    border-radius: 50%;
  }
  .spinner div:nth-child(2) {
    border: 8px solid transparent;
    border-bottom-color: $primary;
  }
}
@keyframes loader{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
