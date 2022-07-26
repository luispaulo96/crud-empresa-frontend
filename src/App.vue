<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  mounted() {
    document.body.classList.add('bg-light')
  },
  unmounted() {
    document.body.classList.remove('bg-light')
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav .router-link-active {
  color: #fff !important;
}
</style>
