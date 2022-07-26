<template>
  <Head>
    <title>Logout – CRUD Empresa</title>
  </Head>
  <div class="container-fluid px-4 text-center">
    <p class="h1">Você saiu com sucesso do sistema</p>
    <p class="h5 text-muted">Indo para a página de login</p>
  </div>
</template>

<script setup>
import { Head } from '@vueuse/head'
</script>

<script>
export default {
  name: 'LogoutView',
  async mounted() {
    localStorage.clear()

    setTimeout(() => {
      this.$router.push('/login')
    }, 1000)
  },
}
</script>
