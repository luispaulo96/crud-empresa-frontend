<template>
  <Head>
    <title>Editar usuário – CRUD Empresa</title>
  </Head>
  <menu-bar />
  <div class="container-fluid px-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <h1 class="text-center">Editar usuário existente</h1>
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <user-form button-text="Editar" :id="id" />
            <div class="text-center py-3">
              <div class="small">
                <router-link to="/users">Voltar para a lista</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Head } from '@vueuse/head'
import MenuBar from '@/components/MenuBar.vue'
import UserForm from '@/components/UserForm.vue'
</script>

<script>
export default {
  name: 'UsersEdit',
  props: [
    'id',
  ],
}
</script>
