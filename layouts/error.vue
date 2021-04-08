<template>
  <div class="error container">
    <div>
      <h1 v-if="error.statusCode === 404">
        找不到此頁面
      </h1>
      <h1 v-else>
        發生錯誤瞜
      </h1>
      <NuxtLink to="/">
        回首頁
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'] // you can set a custom layout for the error page
}
</script>

<style lang="scss" scoped>
  .error{
    height: 570px;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      display: block;
      text-align: center;
    }
  }
</style>
