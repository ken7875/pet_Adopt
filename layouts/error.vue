<template>
  <div class="container">
    <div>
      <h1 v-if="error.statusCode === 404">
        404, can't find this page
      </h1>
      <h1 v-else>
        Sorry, something get wrong
      </h1>
      <NuxtLink :to="localePath(`/`)">
        home
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
  .container{
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
