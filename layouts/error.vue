<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-if="error.statusCode === 500">
      You get an error
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  props: ['error'] // you can set a custom layout for the error page
}
</script>
